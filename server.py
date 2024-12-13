import os
from http.server import SimpleHTTPRequestHandler, HTTPServer

class SPAServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        file_path = self.translate_path(self.path)
        if not os.path.exists(file_path):
            self.path = "/index.html"
        return super().do_GET()

def run(server_class=HTTPServer, handler_class=SPAServer, port=8000, directory="."):
    os.chdir(directory)
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving SPA on http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Serve a SPA with python3 http.server.")
    parser.add_argument("--port", type=int, default=8000, help="Port to serve on.")
    parser.add_argument(
        "--directory", type=str, default=".", help="Directory of the SPA build."
    )
    args = parser.parse_args()
    run(port=args.port, directory=args.directory)
