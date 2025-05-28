function getCallerInfo() {
	const err = new Error();
	const stack = err.stack?.split("\n") || [];

	let seenLoggingFrame = false;

	for (const line of stack) {
    // ew messy
		const match = line.match(/at (\S+)? ?\(?(.+):(\d+):(\d+)\)?/);
		if (!match) continue;

		const fullPath = match[2];

		// don't log from logging.jsx 
		if (fullPath.includes("logging.jsx")) {
			seenLoggingFrame = true;
			continue;
		}

		if (seenLoggingFrame) {
			seenLoggingFrame = false;
			continue;
		}

		const fileName = fullPath.split("/").pop();
		return `[${fileName}]`;
	}

	return "[unknown]";
}



export function log(message) {
	console.log(`${getCallerInfo()} ${message}`);
}

export function warn(message) {
	console.warn(`${getCallerInfo()} ${message}`);
}

export function err(message) {
	console.error(`${getCallerInfo()} ${message}`);
}
