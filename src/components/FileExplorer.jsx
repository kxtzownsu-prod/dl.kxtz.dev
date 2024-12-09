import { FileItem } from './FileItem.jsx';


export function FileExplorer({ files }) {
  return (
    <div className="bg-github text-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <span className="text-lg font-semibold">Name</span>
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold">Last Modified</span>
          <span className="text-lg font-semibold pr-36">Size</span>
        </div>
      </div>

      {files.map((file) => (
        <FileItem
          key={file.name}
          name={file.name}
          modified={file.modified}
          size={file.size}
          type={file.type}
        />
      ))}
    </div>
  );
}