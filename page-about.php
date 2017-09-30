<?php get_header(); ?>

<?php 
	$poster = get_field('poster');
	$intro = $post->post_content;
	
	$galleryImages = array(get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'));
?>
<article class="page page-about js-page">
	
	<h2 class="title page-about__title"><?php echo $post->post_title; ?></h2>

</article>

<?php get_footer();
