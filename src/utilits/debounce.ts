export default function debounce<
	Fn extends (text: string) => void
>(
	cb: Fn,
	delay: number = 1000
) {
	let timeout: NodeJS.Timeout;
	return (value: string) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cb(value);
		}, delay);
	};
};
