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
			<video autoplay loop muted src="<?php echo get_template_directory_uri() . '/assets/video/temp-video.mp4' ?>" class="js-video"></video>
			<canvas class="js-canvas"></canvas>
		</div>
		<header class="intro js-intro">	
			<div class="logo intro__logo js-logo">71 Pictures</div>
		</header>
		<nav style="
				position: fixed;
			    top: 0;
			    right: 0;
			">
			<a href="/">NTSC</a>
			<a href="/artists">Artists</a>
			<a href="/company">Company</a>
		</nav>
		<main id="main-region">
			