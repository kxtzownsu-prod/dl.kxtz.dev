import '../tailwind.css';
import { useEffect, useState } from 'react';
import { NavBar, Footer } from '../components/navbar';
import { FileExplorer } from '../components/FileExplorer';
import { README } from '../components/README';
import { Breadcrumbs } from '../components/Navigator.jsx';

export function Index() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const path = encodeURIComponent(window.location.pathname);
        const response = await fetch(`https://ddl.kxtz.dev/api/v1/files?path=${path}`);
        const data = await response.json();
  
        if (data.error) {
          setFiles([
            {
              name: data.error,
              modified: 'Jan 1 1970, 00:00',
              size: null,
              type: 'error',
            },
          ]);
        } else if (!Array.isArray(data)) {
          setFiles([
            {
              name: 'Unexpected response from server',
              modified: 'Jan 1 1970, 00:00',
              size: null,
              type: 'folder',
            },
          ]);
        } else {
          setFiles(data);
        }
      } catch (err) {
        console.error(err);
        setFiles([
          {
            name: 'Unable to fetch files, dm @kxtzownsu on discord',
            modified: 'Jan 1 1970, 00:00',
            size: null,
            type: 'folder',
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
