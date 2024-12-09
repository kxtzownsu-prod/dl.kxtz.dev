import { loadMarkdown } from './loadMarkdown';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';

export function README(){
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    loadMarkdown().then((text) => setMarkdown(text));
  }, []);

  if (markdown == "<markdown-dnr>"  ){
    return (
      <p></p>
    );
  } else {
    return (
      <div className="flex justify-center mt-10 flex-grow">
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
    )
  }
};