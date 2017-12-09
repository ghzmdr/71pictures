import Size from 'lib/Size';
import { View } from 'lib/View';

import MasonryComponent from 'views/components/content/MasonryComponent'
import VideoComponent from 'views/components/content/VideoComponent'

const FlexibleContent = View.extend({

    components: {
        masonry: {type: MasonryComponent, selector: '.js-masonry'},
        video: {type: VideoComponent, selector: '.js-video'}
    }

})

export default FlexibleContent;
