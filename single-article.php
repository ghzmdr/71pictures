<?php get_header(); ?>
<article class="page page-article js-page">
	
	<header class="page__header">
		<h2 class="page__title js-page-title">
			<?php the_title(); ?>
		</h2>
		<?php if (get_field('subtitle')) { ?>
		<h5 class="page__subtitle js-page-subtitle">
			<?php the_field('subtitle'); ?>
		</h5>
		<?php } ?> 
	</header>
	<?php 

		$slug = get_the_terms(get_the_ID(), 'article_types')[0]->slug;
		switch ($slug) {
			case 'project':
				include 'parts/articles/project.php';
				break;
			
			case 'blog': 
				include 'parts/articles/blog.php';
				break;
		}
	?>

</article>

<?php get_footer();
