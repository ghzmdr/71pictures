<?php get_header(); ?>


<div class="page page-home js-page">

    <?php $showreel_slides = get_field('slides') ?>
    <div class="showreel js-showreel">

        <ul class="list list-showreel-slides showreel__slides">
            <?php foreach ($showreel_slides as $slide) {
                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $slide['slide']->ID ), 'single-post-thumbnail' )[0];
                $loop_video = get_field('loop_video', $slide['slide']->ID);
            ?>
            <li class="list__item list-showreel-slides__item showreel-slide js-slide">
                <video class="showreel-slide__video" src="<?php echo $loop_video; ?>" poster="<?php echo $image ?>" muted loop playsinline oncanplay="this.play()"></video>
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
                <a href="<?php echo get_permalink($slide['slide']); ?>" class="button button-explore showreel-description__button-explore js-button">

                    <span class="button-explore__label js-label">
                        Explore
                    </span>

                    <svg class="button-explore__arrow js-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.098 11.003h14.976l-4.66-4.66 1.414-1.414 7.07 7.07-7.07 7.07-1.414-1.413 4.66-4.66H3.098v-1.994z"/></svg>
                </a>
            </li>
            <?php } ?>
        </ul>

        <?php if (count($showreel_slides) > 1) { ?>
        <ul class="list list--horizontal list-showreel-bullets showreel__bullets">
            <?php foreach ($showreel_slides as $slide) { ?>
            <li class="list__item list-showreel-bullets__item">
                <button class="button button-showreel-bullet js-bullet"></button>
            </li>
            <?php } ?>
        </ul>
        <?php } ?>

    </div>

</div>

<?php get_footer(); ?>
