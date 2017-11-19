<?php get_header(); ?>
<div class="page page-articles js-page">

    <div class="articles-header">
        <h3 class="articles-header__title">Articles</h3>
    </div>

    <div class="articles-selector js-articles-selector">
        <ul class="list list--horizontal articles-selector__types">
            <li class="list-item articles-selector__type" data-article-type="all">
                <a class="js-article-type" href="/articles/">All</a>
            </li>
            <?php $article_types = get_terms( array('taxonomy'=>'article_types', 'hide_empty' => false ));
            foreach ($article_types as $article_type) { ?>
                <?php $article_type = get_object_vars($article_type); ?>
                <li class="list-item articles-selector__type">
                    <a class="button button-article-type js-article-type" href="/articles/<?php echo $article_type['slug']; ?>/">
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
