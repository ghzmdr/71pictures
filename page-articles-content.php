<?php get_header(); ?>
<article class="page page-articles js-page">
	
	<header class="page__header">
		<h2 class="page__title js-page-title">
			Articles
		</h2>
		<h5 class="page__subtitle js-page-subtitle">
			<?php the_field('subtitle'); ?>
		</h5>
	</header>

	<div class="article-selector">
		<ul class="list list--horizontal article-selector__types">
			<li class="list-item article-selector__type" data-article-type="all">
				<a href="/articles/">All</a>
			</li>
			<?php $article_types = get_terms( array('taxonomy'=>'article_types', 'hide_empty' => false )); 	
			foreach ($article_types as $article_type) { ?>
				<?php $article_type = get_object_vars($article_type); ?>
				<li class="list-item article-selector__type">
					<a href="/articles/<?php echo $article_type['slug']; ?>/">
						<?php echo $article_type['name']; ?>
					</a>
				</li>
			<?php } ?>
		</ul>
	</div>


</article>
<?php get_footer();
