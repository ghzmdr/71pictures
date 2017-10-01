export function offsetTop (element) {
	
	let top = 0;
	do {
		top += element.offsetTop;
	} while (element = element.offsetParent);

	return top;
}
