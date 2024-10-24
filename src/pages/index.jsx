import { useState, useEffect } from 'react';
import '../tailwind.css';
import { NavBar, Footer } from '../components/navbar';
import { FaFolder, FaCopy, FaSyncAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';

const loadMarkdown = async () => {
  const response = await fetch('/README.md');
  return await response.text();
};

const FileItem = ({ name, modified, size }) => (
  <div className="flex justify-between p-3 border rounded-2xl mb-1 border-gray-600 items-center">
    <div className="flex items-center space-x-4">
      <FaFolder className="h-6 w-6 text-gray-400" />
      <span className="text-white">{name}</span>
    </div>
    <div className="flex items-center space-x-8">
      <span className="text-gray-400">{modified}</span>
      <span className="text-gray-400">{size}</span>
      <div className="flex space-x-2">
        <button className="text-gray-400 hover:text-white">
          <FaCopy className="h-5 w-5" />
        </button>
        <button className="text-gray-400 hover:text-white">
          <FaSyncAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

const FileExplorer = () => {
  const files = [
    { name: 'ChromeOS', modified: 'Jul 16 2024, 01:00', size: '203 GB' },
    { name: 'isos', modified: 'Jul 23 2024, 00:58', size: '5.1 GB' },
    { name: 'neofetch', modified: 'Jul 16 2024, 08:39', size: '52 KB' },
    { name: 'software', modified: 'Aug 4 2024, 16:53', size: '9 MB' },
  ];

  return (
    <div className="bg-github text-white rounded-lg shadow-md p-4 w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <span className="text-lg font-semibold pr-72">Name</span>
        <span className="text-lg font-semibold">Last Modified</span>
        <span className="text-lg font-semibold pr-28">Size</span>
      </div>

      {files.map((file) => (
        <FileItem key={file.name} name={file.name} modified={file.modified} size={file.size} />
      ))}
    </div>
  );
};

export function Index() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    loadMarkdown().then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="bg-background w-full h-full text-primary">
      <NavBar />
      <div className="h-10 flex mt-10 justify-center">
        <h2 className="bg-bg_secondary pr-6 pl-6 py-2">
          <a className="underline" href="/">Home</a>
        </h2>
      </div>
      <div className="flex justify-center">
        <FileExplorer />
      </div>

      <div className="flex justify-center mt-10">
        <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 w-full max-w-3xl markdown-body">
          <h3 className="text-xl font-semibold">README.md</h3>
          <ReactMarkdown
            className="mt-4 text-primary font-mono"
            rehypePlugins={[rehypeRaw, rehypeHighlight]} 
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
      <Footer />
    </div>
  );
}
