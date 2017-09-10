<?php get_header(); ?>

<?php 
	$post = get_post(23);
	$poster = get_field('poster');
	$intro = get_field('intro');

	$galleryImages = array(get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'), get_field('gallery_image'));
?>
<div class="page-home js-page-home">
	 <div class="page-home__content">

		<div class="page-home__background">
			<div class="page-home__background-video js-home-video">
				<video autoplay loop muted src="<?php echo get_template_directory_uri() . '/assets/video/temp-video.mp4' ?>" class="js-video-element"></video>
				<canvas class="page-home__background-canvas js-video-canvas"></canvas>
			</div>
		</div>
		<div class="page-home__logo js-home-logo">71 Pictures</div>
	
	 </div>
	 <div class="page-home__peek js-home-peek">
	 	<div class="page-home__peek-content">


			<div class="page-main-project page-ntsc js-page-ntsc">
			
				<div class="ntsc-block--title">
					<h2 class="page-main-project__title page-ntsc__title"><?php echo $post->post_title; ?></h2>
				</div>
		
				<div class="ntsc-block page-ntsc__intro-block">
					<img class="page-main-project__poster page-ntsc__poster" src="<?php echo $poster; ?>">
					<div class="text page-main-project__intro page-ntsc__intro"><?php echo $intro; ?></div>
				</div>

				<div class="ntsc-block--wide">
					<div class="carousel carousel--wide page-ntsc__carousel js-ntsc-carousel">
						<h4 class="block-title carousel__title">Landscapes</h4>

						<div class="carousel__slides-wrapper">
							
							<div class="carousel__slides js-carousel-slides">
								<?php foreach ($galleryImages as $key => $imgURL) { ?>

									<div class="carousel__slide page-ntsc__carousel-slide js-carousel-slide">
										<img src="<?php echo $imgURL ?>" alt="">
									</div>
									
								<?php } ?>
							</div>

							<button class="button carousel__prev js-carousel-prev"></button>
							<button class="button carousel__next js-carousel-next"></button>

						</div>

					</div>
				</div>

				<div class="ntsc-block--wide">
					<div class="carousel carousel--wide page-ntsc__carousel js-ntsc-carousel-2 js-ntsc-carousel">
						<h4 class="block-title carousel__title">The City</h4>

						<div class="carousel__slides-wrapper">
							
							<div class="carousel__slides js-carousel-slides">
								<?php foreach ($galleryImages as $key => $imgURL) { ?>

									<div class="carousel__slide page-ntsc__carousel-slide js-carousel-slide">
										<img src="<?php echo $imgURL ?>" alt="">
									</div>
									
								<?php } ?>
							</div>

							<button class="button carousel__prev js-carousel-prev"></button>
							<button class="button carousel__next js-carousel-next"></button>

						</div>

					</div>
				</div>
			</div>


	 	</div>
	 </div>
</div>

<?php get_footer();
