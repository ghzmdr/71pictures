<?php $portfolio_link = get_field('portfolio_link'); ?>

<header class="page-header">
<h2 class="page-header__title js-page-title">
    <?php the_title(); ?>
    <a class="anchor interview-article-portfolio" href="<?php echo $portfolio_link; ?>" target="_blank">PORTFOLIO</a>
</h2>
</header>
<div class="interview-article js-interview-article">
    <?php $content = get_field('content'); ?>




    <section class="section interview-article__content js-content">
        <?php echo $content; ?>
    </section>
</div>
