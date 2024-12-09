export function Breadcrumbs() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  function navigate(href) {
    if (window.location.pathname !== href) {
      window.location.href = href;
    }
  }

  return (
    <div className="h-10 flex mt-10 justify-center">
      <h2 className="bg-bg_secondary pr-6 pl-6 py-2">
        <span
          className="underline cursor-pointer"
          onClick={() => navigate('/')}
        >
          Home
        </span>
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');

          return (
            <span key={href}>
              <span className="text-white pl-2 pr-2">/</span>
              <span
                className="underline cursor-pointer"
                onClick={() => navigate(href)}
              >
                {segment}
              </span>
            </span>
          );
        })}
      </h2>
    </div>
  );
}
