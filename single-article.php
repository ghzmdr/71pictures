<?php get_header(); ?>

<?php
    $kind = get_the_terms(get_the_ID(), 'article_types')[0]->slug;

    $cover_image = get_field('cover');
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
            <time class="article-content-header__date">10 December 2017</time>
            <div class="article-content-header__share">
                <a href="" class="button button-article-share">Share</a>
            </div>
        </div>
        <?php if ($content) foreach ($content as $block) { ?>

            <?php if ( isset($block['text']) ) { ?>
            <div class="article-content-text">
                <?php echo $block['text'] ?>
            </div>
            <?php } ?>

            <?php if ( isset($block['image']) ) { ?>
                <img class="lazyload article-content-image" src="<?php echo $block['image'] ?>" alt="">
            <?php } ?>

            <?php if ( isset($block['left_image']) ) { ?>
                <div class="article-content-double-images">
                    <img src="<?php echo $block['left_image'] ?>" alt="" class="lazyload article-double-images__image">
                    <img src="<?php echo $block['right_image'] ?>" alt="" class="lazyload article-double-images__image">
                </div>
            <?php } ?>

            <?php if ( isset($block['giphy']) ) { ?>
                <img src="<?php echo $block['giphy'] ?>" alt="" class="lazyload article-content-giphy">
            <?php } ?>


        <pre>
            <?php var_dump($block) ?>
        </pre>

        <?php } ?>

        <div class="article-content-video js-video" data-type="youtube" data-video-id="bTqVqk7FSmY"></div>
    </div>
</article>

<?php get_footer();
