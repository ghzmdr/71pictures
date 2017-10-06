<section class="cover js-cover" id="#cover">

	<div class="cover__content">
		<?php $cover = get_field('cover', 'option'); ?>
		<?php if ($cover['video_enabled']) { ?>
			<div class="background js-background">
				<video autoplay loop muted src="<?php echo $cover['video'] ?>" class="js-video"></video>
				<canvas class="js-canvas"></canvas>
			</div>
		<?php } ?>

		<?php if (!$cover['video_enabled']) { ?>
			<img class="cover__image js-image" src="<?php echo $cover['image']; ?>" alt="">
		<?php } ?>

		<div class="cover__logo">
			<?php include 'assets/img/logo-with-text.svg' ?>
		</div>
	</div>

</section>

