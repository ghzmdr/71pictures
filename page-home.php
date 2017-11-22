<?php get_header(); ?>


<div class="page page-home js-page">

    <?php $showreel_slides = get_field('slides') ?>
    <div class="showreel js-showreel">

        <ul class="list list-showreel-slides showreel__slides">
            <?php foreach ($showreel_slides as $slide) {
                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $slide['slide']->ID ), 'single-post-thumbnail' )[0];
            ?>
            <li class="list__item list-showreel-slides__item showreel-slide js-slide">
                <img src="<?php echo $image ?>" alt="" class="lazyload showreel-slide__image">
            </li>
            <?php } ?>
        </ul>

        <ul class="list list-showreel-descriptions showreel__descriptions">
            <?php foreach ($showreel_slides as $slide) {
                $title = $slide['slide']->post_title;
                $excerpt = $slide['slide']->post_excerpt;
            ?>
            <li class="list__item list-showreel-descriptions__item showreel-description js-description">
                <h3 class="showreel-description__title js-title"><?php echo $title ?></h3>
                <p class="showreel-description__excerpt js-excerpt"><?php echo $excerpt ?></p>
            </li>
            <?php } ?>
        </ul>

        <ul class="list list--horizontal list-showreel-bullets showreel__bullets">
            <?php foreach ($showreel_slides as $slide) { ?>
            <li class="list__item list-showreel-bullets__item">
                <button class="button button-showreel-bullet js-bullet"></button>
            </li>
            <?php } ?>
        </ul>

    </div>

</div>

<?php get_footer(); ?>
