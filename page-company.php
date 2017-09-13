<?php get_header(); ?>

<?php 
	$poster = get_field('poster');
	$intro = $post->post_content;
	
	$galleryImages = array(get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'));
?>
<article class="page page-company js-page">

	<div class="company-block--title">
		<h2 class="page-main-project__title page-company__title" id="company"><?php echo $post->post_title; ?></h2>
	</div>

	<div class="company-block page-company__intro-block">
		<img class="page-main-project__poster page-company__poster" src="<?php echo $poster; ?>">
		<div class="text page-main-project__intro page-company__intro"><?php echo $intro; ?></div>
	</div>

	<div class="company-block--wide">
		<div class="carousel carousel--wide page-company__carousel js-carousel">
			<h4 class="block-title carousel__title">Landscapes</h4>

			<div class="carousel__slides-wrapper">
				
				<div class="carousel__slides js-carousel-slides">
					<?php foreach ($galleryImages as $key => $imgURL) { ?>

						<div class="carousel__slide page-company__carousel-slide js-carousel-slide">
							<img src="<?php echo $imgURL ?>" alt="">
						</div>
						
					<?php } ?>
				</div>

				<button class="button carousel__prev js-carousel-prev"></button>
				<button class="button carousel__next js-carousel-next"></button>

			</div>

		</div>
	</div>

	<div class="company-block--wide">
		<div class="carousel carousel--wide page-company__carousel js-carousel">
			<h4 class="block-title carousel__title">The City</h4>

			<div class="carousel__slides-wrapper">
				
				<div class="carousel__slides js-carousel-slides">
					<?php foreach ($galleryImages as $key => $imgURL) { ?>

						<div class="carousel__slide page-company__carousel-slide js-carousel-slide">
							<img src="<?php echo $imgURL ?>" alt="">
						</div>
						
					<?php } ?>
				</div>

				<button class="button carousel__prev js-carousel-prev"></button>
				<button class="button carousel__next js-carousel-next"></button>

			</div>

		</div>
	</div>
</article>

<?php get_footer();
