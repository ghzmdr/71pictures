<?php get_header(); ?>

<div class="page page-visuals js-page">

    <header class="visuals-header">
        <h3 class="visuals-header__title">Visuals</h3>
        <p class="visuals-header__description">Handcrafted digital gore</p>
    </header>

    <div class="visuals-masonry page-visuals__masonry js-masonry">

        <?php
        $visuals = get_field('visuals');
        foreach ($visuals as $visuals_entry) {
            $image = $visuals_entry['image'];
            $imageHeightRatio = ($image['height'] / $image['width']) * 100 . '%';
            $title = $visuals_entry['title'];
            $description = isset($visuals_entry['description']) ? $visuals_entry['description'] : null;
            // $description = $visuals_entry.description;
        ?>
            <div class="visuals-masonry-item js-masonry-item">
                <div class="visuals-masonry-item__content">
                    <div class="visuals-entry">
                        <div class="visuals-entry__image-wrapper" style="padding-bottom: <?php echo $imageHeightRatio; ?>">
                            <img data-src="<?php echo $image['url']; ?>" alt="" class="lazyload visuals-entry__image">
                        </div>
                        <div class="visuals-entry__content">
                            <div class="visuals-entry__title"><?php echo $title; ?></div>
                            <?php if ($description) { ?>
                                <div class="visuals-entry__description">
                                    <span>
                                        <?php echo $description; ?>
                                    </span>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>

</div>

<?php get_footer(); ?>
