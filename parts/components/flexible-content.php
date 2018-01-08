<div class="flexible-content js-flexible-content">

    <?php $content =  get_field('cnt') ?>

    <?php if ($content) foreach ($content as $block) {

        switch ($block['acf_fc_layout']) {

            case 'txt':
                include_once 'content-blocks/text.php';
                break;

            case 'img':
                include_once 'content-blocks/image.php';
                break;

             case 'gif':
                include_once 'content-blocks/gif.php';
                break;

            case 'dimg':
                include_once 'content-blocks/double-image.php';
                break;

            case 'vid':
                include_once 'content-blocks/video.php';
                break;

            case 'msry':
                include_once 'content-blocks/masonry.php';
                break;

        }

    } ?>

</div>
