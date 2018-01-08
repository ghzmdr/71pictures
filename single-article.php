<?php get_header(); ?>

<?php
    $kind = get_the_terms(get_the_ID(), 'article_types')[0]->slug;

    $cover_image = get_field('cover_image');
    $content = get_field('content');
?>

<article class="page page-article article article--<?php echo $kind ?> js-page">

    <header class="article-header">

        <div class="article-header__background">
            <div class="article-header__video"></div>
            <img src="<?php echo $cover_image ?>" class="article-header__image"/>
        </div>

        <div class="article-header__content">
            <h1 class="article-header__title">
                <?php the_title(); ?>
            </h1>

        </div>


    </header>


    <div class="article-content">
        <div class="article-content-header">
            <time class="article-content-header__date"><?php echo get_the_date( 'd F Y') ?></time>

            <div class="article-content-header__share article-share js-article-share">
                <button class="button button-article-share js-button-share">Share:</button>
                <ul class="list list--horizontal list-article-socials article-share__socials">
                    <li class="list__item list-article-socials__item">
                        <button class="button button-article-social js-social" data-share-current="facebook">
                            <img src="assets/svg/icons/socials/facebook.svg" alt="" class="icon button-article__icon">
                        </button>
                    </li>
                    <li class="list__item list-article-socials__item">
                        <button class="button button-article-social js-social" data-share-current="twitter">
                            <img src="assets/svg/icons/socials/twitter.svg" alt="" class="icon button-article__icon">
                        </button>
                    </li>
                </ul>
            </div>
            <!-- <div class="article-content-header__share">
                <a href="" class="button button-article-share">Share</a>
            </div> -->
        </div>

        <?php include_once('parts/components/flexible-content.php'); ?>

    </div>
</article>

<?php get_footer();
