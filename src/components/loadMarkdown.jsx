import { backend } from "./backendInteraction";
import { err } from "../logging";

export async function loadMarkdown() {
	let path = window.location.pathname;
	if (path === "/") path = "";

	try {
		const text = await backend.raw(`${path}/README.md`);

		if (text === '{"error":"File not found"}') {
			return "<markdown-dnr>"; // dnr means Do Not Render
		}

		return text;
	} catch (error) {
		err("Failed to load README.md:", error);
		return "No README.md found";
	}
}
