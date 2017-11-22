import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template, bindAll } from 'lodash';

const Article = View.extend({

    ui: {
        image: '.js-image',
        title: '.js-title',
        copy: '.js-copy'
    },

    initialize: function (options) {
        // bindAll(this, '_mouseInHandler', '_mouseOutHandler');

        var compiledTemplate = template(options.template);
        var html = compiledTemplate(options.model.attributes);
        var element = document.createElement('div');
        element.innerHTML = html;
        this.setElement(element.firstElementChild);
    },

    transitionIn: function () {
        TweenLite.to(this.el, 0.3, {autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {autoAlpha: 0, onComplete: cb});
    }


});

export default Article;
