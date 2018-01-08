<?php get_header(); ?>

<?php

    $text = get_field('text');
    $image = get_field('image');
    $phone = get_field('phone');
    $mail = get_field('mail');

?>
<div class="page page-about js-page">

        <header class="about-header">
            <h3 class="about-header__title">About</h3>
        </header>

        <div class="page-about__text">
            <?php echo $text ?>
        </div>

        <div class="page-about__map">
            <img class="page-about__image" src="<?php echo $image ?>" alt="">
        </div>
        <div class="page-about__info about-info">
            <h3 class="about-info__header">
                CONTACT
            </h3>
            <div class="about-info__column">
                <span class="about-info__label">Phone:</span>
                <span class="about-info__value">
                    <a class="button button-contacts-link" href="tel:<?php echo $phone ?>"><?php echo $phone ?></a>
                </span>
            </div>
            <div class="about-info__column">
                <span class="about-info__label">Mail:</span>
                <span class="about-info__value">
                    <a class="button button-contacts-link" href="mailto:<?php echo $mail ?>"><?php echo $mail ?></a>
                </span>
            </div>
        </div>
</div>

<?php get_footer(); ?>
