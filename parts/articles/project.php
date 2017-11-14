<header class="page-header">
<h2 class="page-header__title js-page-title">
    <?php the_title(); ?>
</h2>
<?php if (get_field('subtitle')) { ?>
<h5 class="page-header__subtitle js-page-subtitle">
    <?php the_field('subtitle'); ?>
</h5>
<?php } ?>
</header>
<div class="project-article js-project-article">
    <?php $intro_video = get_field('intro_video'); ?>
    <?php $intro_text = get_field('intro_text'); ?>

    <?php if ($intro_video) { ?>
    <section class="section section--wide project-article__section-video">
        <div class="project-article__video-wrapper">
            <iframe class="project-article__video js-video" frameborder="0" allowfullscreen
                src=
                        <?php if ($intro_video['type'] == 'vimeo') { ?>
                            "https://player.vimeo.com/video/<?php echo $intro_video['id']; ?>""
                        <?php } else {?>
                            "https://www.youtube.com/embed/<?php echo $intro_video['id']; ?>?rel=0&amp;showinfo=0"
                        <?php } ?>
            ></iframe>
        </div>
    </section>
    <?php } ?>

    <section class="section project-article__intro js-intro">
        <?php echo $intro_text; ?>
    </section>
</div>
