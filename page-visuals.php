<?php get_header(); ?>

<article class="page page-visuals js-page">

    <header class="page-header">
        <h2 class="page-header__title js-page-title">
            <?php echo $post->post_title; ?>
        </h2>
    </header>

    <?php $galleries =  get_field('galleries'); ?>

    <?php foreach($galleries as $gallery) { ?>
            <?php if ($gallery) { ?>
            <section class="section section--wide carousel carousel--wide <?php if ($gallery['title']) { ?> carousel--with-title <?php } ?>page-ntsc__carousel js-carousel">

                <?php if ($gallery['title']) { ?>
                <h4 class="title carousel__title"><?php echo $gallery['title']; ?></h4>
                <?php } ?>

                <div class="carousel__slides-wrapper">

                    <ul class="carousel__slides js-carousel-slides">
                        <?php foreach ($gallery['images'] as $image) { ?>
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
    <?php } ?>
</article>

<?php get_footer();
