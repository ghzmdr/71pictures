<?php get_header(); ?>
<div class="page page-articles js-page">

    <header class="page-header">
        <h2 class="page-header__title js-page-title">
            Articles
        </h2>
        <h5 class="page-header__subtitle js-page-subtitle">
            <?php the_field('subtitle'); ?>
        </h5>
    </header>

    <div class="article-selector js-articles-selector">
        <ul class="list list--horizontal article-selector__types">
            <li class="list-item article-selector__type" data-article-type="all">
                <a class="js-article-type" href="/articles/">All</a>
            </li>
            <?php $article_types = get_terms( array('taxonomy'=>'article_types', 'hide_empty' => false ));
            foreach ($article_types as $article_type) { ?>
                <?php $article_type = get_object_vars($article_type); ?>
                <li class="list-item article-selector__type">
                    <a class="js-article-type" href="/articles/<?php echo $article_type['slug']; ?>/">
                        <?php echo $article_type['name']; ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    </div>

    <section class="section articles js-articles">
        <div class="articles__list js-articles-list">

        </div>
        <script type="text/template" data-template="article">
            <?php include 'parts/templates/article-excerpt.php' ?>
        </script>
    </section>

</div>
<?php get_footer();
