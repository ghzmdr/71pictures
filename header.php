<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">

<?php wp_head(); ?>
</head>

<body>

	<div id="seventyonepictures">
		<div class="background js-background">
			<!-- TODO: Change video basing on route (???) -->
			<video autoplay loop muted src="<?php the_field('intro_video', 'option') ?>" class="js-video"></video>
			<canvas class="js-canvas"></canvas>
		</div>
		
		<header class="intro js-intro">	
			<div class="logo intro__logo js-logo">71 Pictures</div>
		</header>
		
		<main id="main-region">
			