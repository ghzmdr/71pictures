<?php get_header(); ?>
<article class="page page-article js-page">

    <?php

        $slug = get_the_terms(get_the_ID(), 'article_types')[0]->slug;
        switch ($slug) {
            case 'project':
                include 'parts/articles/project.php';
                break;

            case 'blog':
                include 'parts/articles/blog.php';
                break;

            case 'interview':
                include 'parts/articles/interview.php';
                break;
        }
    ?>

</article>

<?php get_footer();
