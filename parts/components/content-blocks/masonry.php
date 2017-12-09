<div class="content-component-masonry masonry js-masonry">

    <?php foreach ($block['msry'] as $tile) {
        $image = $tile['image'];
        $imageHeightRatio = ($image['height'] / $image['width']) * 100 . '%';
        $title = $tile['title'];
        $description = isset($tile['description']) ? $tile['description'] : null;
    ?>

    <div class="masonry-item js-masonry-item">
        <img data-src="<?php echo $image['url']; ?>" alt="" class="lazyload masonry-item__image">
        <div class="masonry-item__copy">
            <div class="masonry-item__title"><?php echo $title; ?></div>
            <?php if ($description) { ?>
                <div class="masonry-item__description">
                    <span>
                        <?php echo $description; ?>
                    </span>
                </div>
            <?php } ?>
        </div>
    </div>

    <?php } ?>
</div>
