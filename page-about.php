<?php get_header(); ?>

<?php 
	$poster = get_field('poster');
	$intro = $post->post_content;
	
	$galleryImages = array(get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'));
?>
<article class="page page-about js-page">
	
	<header class="page__header">
		<h2 class="page__title js-page-title">
			<?php echo $post->post_title; ?>
		</h2>
		<h5 class="page__subtitle js-page-subtitle">
			<?php the_field('subtitle'); ?>
		</h5>
	</header>

</article>

<?php get_footer();
