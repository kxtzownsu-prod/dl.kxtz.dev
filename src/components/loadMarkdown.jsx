export async function loadMarkdown () {
  let path = window.location.pathname;
  if (path === "/") {
    path = "";
  }
  const origin = window.location.origin;
  const newpath = `https://ddl.kxtz.dev/api/v1/download?path=${path}/README.md`;

  try {
    const response = await fetch(newpath);
    const text = await response.text();

    if (text == '{"error":"File not found"}' ) {
      return "<markdown-dnr>";
      // dnr means do not render
    }

    return text;
  } catch (error) {
    console.error("Failed to fetch README.md:", error);
    return "No README.md found";
  }
};