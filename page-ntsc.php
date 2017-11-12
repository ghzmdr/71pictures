<?php get_header(); ?>
<article class="page page-ntsc js-page"  id="#ntsc">
    <?php $poster = get_field('poster'); ?>

    <header class="page-header">
        <h2 class="page-header__title js-page-title">
            <?php echo $post->post_title; ?>
        </h2>
        <h5 class="page-header__subtitle js-page-subtitle">
            <?php the_field('subtitle'); ?>
        </h5>
    </header>

    <section class="section page-ntsc__intro-block">

        <?php $intro = get_field('intro'); ?>
        <div class="text page-ntsc__intro js-ntsc-intro"><?php echo $intro; ?></div>

        <?php if($poster['with_parallax']) { ?>
        <div class="parallax-poster page-ntsc__poster wide-only js-parallax-poster">
            <div class="parallax-poster__items js-parallax-poster-container">
                <?php foreach ($poster['poster_layers'] as $posterLayer) {?>
                <img class="parallax-poster__item js-parallax-poster-item"
                    src="<?php echo $posterLayer['layer_image']; ?>"
                    data-depth="<?php echo $posterLayer['layer_depth']; ?>"
                />
                <?php } ?>
            </div>

        </div>
        <?php } else { ?>
        <img class="page-ntsc__poster desktop-only" src="<?php echo $poster['poster_image']; ?>">
        <?php } ?>


    </section>

    <?php $mainGallery = get_field('main_gallery'); if ($mainGallery) {?>
        <section class="section section--wide carousel carousel--wide <?php if ($mainGallery['title']) { ?> carousel--with-title <?php } ?>page-ntsc__carousel js-carousel">

            <?php if ($mainGallery['title']) { ?>
            <h4 class="title carousel__title"><?php echo $mainGallery['title']; ?></h4>
            <?php } ?>

            <div class="carousel__slides-wrapper">

                <ul class="carousel__slides js-carousel-slides">
                    <?php foreach ($mainGallery['images'] as $image) { ?>
                    <li class="carousel__slide page-ntsc__carousel-slide js-carousel-slide">
                        <?php echo wp_get_attachment_image( $image['ID'], 'full' ); ?>
                    </li>
                    <?php } ?>
                </ul>

                <button class="button carousel__prev js-carousel-prev"></button>
                <button class="button carousel__next js-carousel-next"></button>

            </div>

        </section>
        <?php } ?>
</article>
<?php get_footer();
