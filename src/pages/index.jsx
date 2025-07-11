import "../tailwind.css";
import { useEffect, useState } from "react";
import { NavBar, Footer } from "../components/navbar";
import { FileExplorer } from "../components/FileExplorer";
import { README } from "../components/README";
import { Breadcrumbs } from "../components/Navigator";
import { warn, err } from "../logging";
import {
	backend,
	getActiveOrigin,
	PRIMARY_ORIGIN,
} from "../components/backendInteraction.jsx";

export function Index() {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [indexHtml, setIndexHtml] = useState(null);
	const [typed, setTyped] = useState("");
	const [triggered, setTriggered] = useState(false);
	const [activeOrigin, setActiveOrigin] = useState(null);
	const [showDisclaimer, setShowDisclaimer] = useState(true);

	useEffect(() => {
		getActiveOrigin().then(setActiveOrigin);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			setTyped((prev) => {
				const next = (prev + e.key).slice(-4).toLowerCase();
				if (next === "geen") setTriggered(true);
				return next;
			});
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		if (triggered) {
			document.querySelectorAll("*").forEach((el) => {
				if (el.children.length === 0 && el.textContent.trim() !== "") {
					el.textContent = "GEEN HACKED KXTZ'S FILEHOST";
				}
				el.style.color = "hsl(114, 56%, 77%)";
				el.style.backgroundColor = "black";
			});

			const audio = new Audio("https://kxtz.dev/lifecouldbegeen.mp3");
			audio.loop = true;
			audio.volume = 0.25;
			audio.play().catch((err) => {
				warn("Autoplay might be blocked:", err);
			});

			window.__geen_audio = audio;
		} else {
			if (window.__geen_audio) {
				window.__geen_audio.pause();
				window.__geen_audio.remove();
				delete window.__geen_audio;
			}
		}
	}, [triggered]);

	useEffect(() => {
		const fetchFiles = async () => {
			try {
				const path = decodeURIComponent(
					document.documentElement.dataset.pathname || window.location.pathname,
				);
				const data = await backend.filelist(path);

				if (data.error) {
					setFiles([
						{
							name: data.error,
							modified: "Jan 1 1970, 00:00",
							size: null,
							type: "error",
						},
					]);
				} else if (!Array.isArray(data)) {
					setFiles([
						{
							name: "Unexpected response from server",
							modified: "Jan 1 1970, 00:00",
							size: null,
							type: "folder",
						},
					]);
				} else {
					setFiles(data);

					const indexFile = data.find((file) => file.name === "index.html");
					if (indexFile) {
						console.warn("index.html found in this folder.");

						if (path !== "/") {
							const confirmed = confirm(
								"This folder contains an index.html file. Rendering it could cause undefined behavior.\n\nDo you want to display it anyway?\n\n\nI (kxtz) am not responsible for any content hosted here. Abuse reports go to fanqyxl. All files hosted on this site are fanqyxl's, not mine.",
							);
							if (!confirmed) return;

							const htmlContent = await backend.raw(`${path}/index.html`);
							document.documentElement.innerHTML = htmlContent;
						} else {
							console.info(
								"index.html rendering skipped on root path to prevent override.",
							);
						}
					}
				}
			} catch (error) {
				err(error);
				setFiles([
					{
						name: "Unable to fetch files, dm @kxtzownsu on discord",
						modified: "Jan 1 1970, 00:00",
						size: null,
						type: "folder",
					},
				]);
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();
	}, []);

	if (loading) {
		return (
			<div className="text-center text-primary">
				Loading files...
				<br />
				<sub>
					If this takes a while, it could be falling back, if it takes longer
					than 10s, please DM @kxtzownsu on Discord, or email me@kxtz.dev.
				</sub>
			</div>
		);
	}

	if (indexHtml) {
		return (
			<div
				className="bg-background min-h-screen flex flex-col w-full text-primary"
				dangerouslySetInnerHTML={{ __html: indexHtml }}
			/>
		);
	}

	console.log(activeOrigin);
	console.log(PRIMARY_ORIGIN);

	return (
		<div className="bg-background min-h-screen flex flex-col w-full text-primary">
			<NavBar />

			{activeOrigin && activeOrigin !== PRIMARY_ORIGIN && (
				<>
					{showDisclaimer && (
						<div className="bg-red-900 text-red-200 text-center p-2 z-50 relative">
							⚠️ Disclaimer: I (kxtz) am not responsible for any content hosted
							here.
							<br />
							Abuse reports go to{" "}
							<a href="https://fanqyxl.net">
								<b>fanqyxl</b>
							</a>
							, not me (kxtz).
							<br />
							All files hosted on this site are{" "}
							<a href="https://fanqyxl.net">
								<b>fanqyxl</b>
							</a>
							's, not mine (kxtz).
							<br />
							<hr />
							<sub className="text-grey-800 text-xs">
								you're running in fallback mode btw so ddl.kxtz.dev is either
								blocked/down
							</sub>
						</div>
					)}

					{/* <div className="bg-yellow-800 text-yellow-200 text-center p-2">
			⚠️ Running in fallback mode. Expect slower speeds.
			<br />
			<sub>if files still aren't able to be fetched, DM me IMMEDIATELY</sub>
		</div> */}
				</>
			)}

			<Breadcrumbs />
			<div className="flex justify-center">
				<FileExplorer files={files} />
			</div>
			<README />
			<Footer className="mt-auto" />
		</div>
	);
}
