<section class="cover js-cover" id="#cover">
	<?php $cover = get_field('cover', 'option'); ?>
	<?php if ($cover['video_enabled']) { ?>
		<div class="background js-background">
			<video autoplay loop muted src="<?php echo $cover['video'] ?>" class="js-video"></video>
			<canvas class="js-canvas"></canvas>
		</div>
	<?php } ?>

	
	<?php if (!$cover['video_enabled']) { ?>
		<img class="cover__image" src="<?php echo $cover['image']; ?>" alt="">
	<?php } ?>
	
	<header class="cover__intro <?php if ($cover['video_enabled']) echo 'is-fixed'; ?>">	
		<div class="cover__logo js-logo">
			<img src="<?php echo get_template_directory_uri() . '/assets/img/logo.png' ?>" alt="71 Pictures">
		</div>
	</header>

</section>
