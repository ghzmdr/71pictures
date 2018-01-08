<div class="main-navigation js-main-navigation">

    <a href="/" class="logo main-navigation__logo">
        <img src="assets/svg/logo.svg" alt="" class="logo__image not-desktop">
        <img src="assets/svg/logo-with-text.svg" alt="" class="logo__image not-mobile">
    </a>

    <ul class="list list--horizontal list-navigation-links main-navigation__links not-mobile">
        <li class="list__item list-navigation-links__item">
            <a href="/articles/" class="button button-navigation-link js-link">
                <span class="button-navigation-link__label">Articles</span>
            </a>
        </li>
        <li class="list__item list-navigation-links__item">
            <a href="/visuals/" class="button button-navigation-link js-link">
                <span class="button-navigation-link__label">Visuals</span>
            </a>
        </li>
        <li class="list__item list-navigation-links__item">
            <a href="/about/" class="button button-navigation-link js-link">
                <span class="button-navigation-link__label">About</span>
            </a>
        </li>
    </ul>
    <?php $socials = get_field('socials', 'options') ?>
    <ul class="list list--horizontal list-navigation-socials main-navigation__socials not-mobile">
        <?php foreach($socials as $social) { ?>
        <li class="list__item list-navigation-socials__item">
            <a href="<?php echo $social['link'] ?>" class="button button-navigation-social">
                <img src="assets/svg/icons/socials/<?php echo $social['platform'] ?>.svg" class="icon button-navigation-social__icon" />
            </a>
        </li>
        <?php } ?>
    </ul>

</div>
