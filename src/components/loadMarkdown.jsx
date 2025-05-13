import { backend } from "../backendInteraction";

export async function loadMarkdown() {
  let path = window.location.pathname;
  if (path === "/") path = "";

  try {
    const text = await backend.raw(`${path}/README.md`);

    if (text === '{"error":"File not found"}') {
      return "<markdown-dnr>"; // dnr means Do Not Render
    }

    return text;
  } catch (err) {
    console.error("Failed to load README.md:", err);
    return "No README.md found";
  }
}
