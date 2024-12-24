import {
  FaFolder,
  FaCopy,
  FaCircleDown,
  FaFile,
  FaQuestion,
} from "react-icons/fa6";

export function FileItem({ name, modified, size, type }) {
  let path = window.location.pathname;
  if (path === "/") {
    path = "";
  }
  const origin = window.location.origin;
  const newpath = `${origin}${path}/${name}`;
  const ddl = `https://ddl.kxtz.dev/api/v1/download?path=${path}/${name}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(ddl)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex justify-between p-3 border rounded-2xl mb-1 border-gray-600 items-center">
      <div className="flex items-center min-w-[150px] space-x-4">
        <div className="w-6 h-6 flex items-center justify-center">
          {type === "folder" && <FaFolder className="h-6 w-6 text-gray-400" />}
          {type === "file" && <FaFile className="h-6 w-6 text-gray-400" />}
          {type !== "file" && type !== "folder" && (
            <FaQuestion className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div>
          {type === "folder" && (
            <a className="text-white" href={newpath}>
              {name}
            </a>
          )}
          {type === "file" && (
            <a className="text-white" href={ddl}>
              {name}
            </a>
          )}
          {type !== "file" && type !== "folder" && (
            <a className="text-white" href={name}>
              {name}
            </a>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center gap-8">
        <span className="text-gray-400 min-w-[120px]">{modified}</span>
        <span className="text-gray-400 min-w-[80px]">{size}</span>
        {type === "file" && (
          <div className="flex space-x-2">
            <button
              className="text-gray-400 hover:text-white"
              onClick={copyToClipboard}
            >
              <FaCopy className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <a href={`${ddl}`}>
                <FaCircleDown className="h-5 w-5" />
              </a>
            </button>
          </div>
        )}

        {type === "folder" && (
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-white cursor-default">
              <FaCopy className="h-5 w-5 invisible" />
            </button>
            <button className="text-gray-400 hover:text-white cursor-default">
              <FaCircleDown className="h-5 w-5 invisible" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
