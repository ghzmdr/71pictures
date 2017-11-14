<section class="cover js-cover" id="#cover">

    <div class="cover__content">
        <?php $cover = get_field('cover', 'option'); ?>
        <img class="cover__image js-image" src="<?php echo $cover['image']; ?>" alt="">
        <a class="cover__version " href="https://github.com/ghzmdr/71pictures/releases/">Version: 1.0.0</a>
        <div class="cover__logo">
            <?php include 'assets/svg/logo-with-text.svg' ?>
        </div>
    </div>

</section>

