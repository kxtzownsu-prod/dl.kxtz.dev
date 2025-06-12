import "../tailwind.css";

const COMMIT_HASH = import.meta.env.VITE_COMMIT_HASH || "f00dcafe"; // iykyk :trolley:
const BUILD_TIME = import.meta.env.VITE_BUILD_TIME || Math.floor(Date.now() / 1000);


export function NavBar() {
	return (
		<header className="w-full h-16 text-xl bg-bg_secondary text-primary flex items-center font-Space">
			{/* Left Side of the Navbar */}
			<div className="flex items-center">
				<img
					className="mr-3 ml-4"
					src="/kxtz.png"
					width="40"
					height="40"
					style={{ boxShadow: "0 0 20px #cba6f7", borderRadius: "50%" }}
					alt="Logo"
				/>
				<h1 className="text-lg">
					kxtz' download server
					<br />
					<sub className="text-xs text-muted">
						{BUILD_TIME}-g{COMMIT_HASH}
					</sub>
				</h1>
			</div>

			{/* Middle Section of the Navbar */}
			<div className="flex-grow text-center"></div>

			{/* Right Side of the Navbar */}
			<div className="mr-4"></div>
		</header>
	);
}

export function Footer() {
	return (
		<footer className="w-full h-10 text-md mt-auto bg-bg_secondary text-primary flex items-center justify-center top-2 font-mono">
			<p>Made with &lt;3 by kxtzownsu</p>
		</footer>
	);
}
