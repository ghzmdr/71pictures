import { TimelineLite } from 'gsap';

export default function logoAnimation(pieces, letters) {
    var timeline = new TimelineLite();

    pieces.forEach((piece, index) => {
        var position = (index) * 0.2;
        timeline.to(piece, 0.25, {opacity: 1}, position);
    })

    letters.forEach((letter, index) => {
        var position = 0.6 + (0.8 * (index / (letters.length-1)));
        timeline.to(letter, 0.25, {opacity: 1}, position);
    })

    return timeline;
}
