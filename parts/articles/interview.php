<div class="interview-article js-interview-article">
    <?php $content = get_field('content'); ?>
    <?php $portfolio_link = get_field('portfolio_link'); ?>

    <a class="link interview-article__portfolio" href="<?php echo $portfolio_link; ?>" target="_blank">PORTFOLIO</a>

    <section class="interview-article__content js-content">
        <?php echo $content; ?>
    </section>
</div>
