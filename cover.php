<section class="cover js-cover" id="#cover">

    <div class="cover__content">
        <?php $cover = get_field('cover', 'option'); ?>
        <div class="cover-background js-background">
            <img class="cover-background__image" src="<?php echo $cover['image']; ?>" alt="">
            <div class="cover-background__version">Version: 0.5.0</div>
        </div>

        <div class="cover__logo">
            <?php include 'assets/svg/logo-with-text.svg' ?>
        </div>
    </div>

</section>

