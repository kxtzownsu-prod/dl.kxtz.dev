import "../tailwind.css";
import { useEffect, useState } from "react";
import { NavBar, Footer } from "../components/navbar";
import { FileExplorer } from "../components/FileExplorer";
import { README } from "../components/README";
import { Breadcrumbs } from "../components/Navigator.jsx";
import { backend } from "../backendInteraction";

export function Index() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexHtml, setIndexHtml] = useState(null);
  const [typed, setTyped] = useState("");
  const [triggered, setTriggered] = useState(false);

  // geen easter egg
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
    audio.volume = 0.45;
    audio.play().catch((err) => {
      console.warn("Autoplay might be blocked:", err);
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


  // backend file list + index.html handling
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const path = decodeURIComponent(window.location.pathname);
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
            const htmlContent = await backend.raw(`${path}/index.html`);
            setIndexHtml(htmlContent);
          }
        }
      } catch (err) {
        console.error(err);
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
    return <div className="text-center text-primary">Loading files...</div>;
  }

  if (indexHtml) {
    return (
      <div
        className="bg-background min-h-screen flex flex-col w-full text-primary"
        dangerouslySetInnerHTML={{ __html: indexHtml }}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col w-full text-primary">
      <NavBar />
      <Breadcrumbs />
      <div className="flex justify-center">
        <FileExplorer files={files} />
      </div>
      <README />
      <Footer className="mt-auto" />
    </div>
  );
}
