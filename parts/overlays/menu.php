<nav class="menu js-menu">
    <div class="menu__content">
        <ul class="list list-menu-links js-links">
            <li class="list-menu-links__item">
                <a href="/" class="button button-menu-link js-menu-link">Home</a>
            </li>
            <li class="list-menu-links__item">
                <a href="/articles/projects/ntsc" class="button button-menu-link js-menu-link">NTSC</a>
            </li>
            <li class="list-menu-links__item">
                <a href="/articles/" class="button button-menu-link js-menu-link">Articles</a>
            </li>
            <li class="list-menu-links__item">
                <a href="/visuals/" class="button button-menu-link js-menu-link">Visuals</a>
            </li>
            <li class="list-menu-links__item">
                <a href="/about" class="button button-menu-link js-menu-link">About</a>
            </li>
        </ul>

        <?php $socials = get_field('socials', 'options') ?>
        <ul class="list list--horizontal list-menu-socials menu__socials">
            <?php foreach($socials as $social) { ?>
            <li class="list__item list-menu-socials__item">
                <a href="<?php $social['link'] ?>" class="button-menu-social">
                    <img src="assets/svg/icons/socials/<?php echo $social['platform'] ?>.svg" class="icon button-menu-social__icon" />
                </a>
            </li>
            <?php } ?>
        </ul>
    </div>
</nav>
