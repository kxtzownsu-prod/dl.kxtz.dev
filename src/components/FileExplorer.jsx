import { FileItem } from './FileItem.jsx';
import { FaTriangleExclamation } from 'react-icons/fa6';

export function FileExplorer({ files }) {
  if (files.length > 0 && files[0].type === "error") {
    return (
      <div className="bg-github text-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto mt-6 flex flex-col justify-center items-center">
  <FaTriangleExclamation className="text-yellow-500" size={64} />
  <h1 className="text-1xl text-center mt-4">This folder is empty. Please return to the previous one.</h1>
</div>

    );
  } else {

  return (
    <div className="bg-github text-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <span className="text-lg font-semibold">Name</span>
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold">Last Modified</span>
          <span className="text-lg font-semibold pr-36">Size</span>
        </div>
      </div>

      {Array.isArray(files) && files.length > 0 ? (
        files.map((file) => (
          <FileItem
            key={file.name}
            name={file.name}
            modified={file.modified}
            size={file.size}
            type={file.type}
          />
        ))
      ) : (
        <div className="text-center text-sm mt-4"></div>
      )}
    </div>
  )};
}
