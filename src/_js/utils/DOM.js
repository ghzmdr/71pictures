export function offsetTop (element) {

    let top = 0;
    do {
        top += element.offsetTop;
    } while (element = element.offsetParent);

    return top;
}

var passive = null;
// https://github.com/rafrex/detect-passive-events/
export function supportsPassiveEvents() {
    if (passive !== null) return passive;

    const options = Object.defineProperty({}, 'passive', {
        get() { passive = true; },
    });

    const noop = () => {};
    window.addEventListener('testPassiveEventSupport', noop, options);
    window.removeEventListener('testPassiveEventSupport', noop, options);
    return passive;
}
