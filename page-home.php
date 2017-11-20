<?php get_header(); ?>

<div class="page page-home js-page">

    <?php $showreel_slides = get_field('slides') ?>

    <div class="showreel js-showreel">
        <!-- Refactor class names into list-* -->
        <ul class="list showreel__slides">
            <?php foreach ($showreel_slides as $slide) {
                $post = $slide['slide'];
                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' )[0];
            ?>
            <li class="list__item showreel__slide showreel-slide js-showreel-slide">
                <img src="<?php echo $image ?>" alt="<?php echo $post->post_title; ?> cover image" class="lazyload showreel-slide__image js-image">\
                <header class="showreel-slide-header">
                    <div class="showreel-slide-header__background"></div>
                    <div class="showreel-slide-header__content">
                        <h3 class="showreel-slide-header__title js-title"><?php echo $post->post_title; ?></h3>
                        <p class="showreel-slide-header__excerpt js-excerpt"><?php echo $post->post_excerpt; ?></p>
                    </div>
                </header>
                <a href="" class="button button-showreel-cta showreel-slide__cta">See Proect</a>
            </li>
            <?php } ?>
        </ul>
    </div>

</div>

<?php get_footer(); ?>
