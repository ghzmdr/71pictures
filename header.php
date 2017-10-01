<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">

<?php wp_head(); ?>
</head>

<body>

	<div id="seventyonepictures">
		<nav class="navigation">
			<img src="<?php echo get_template_directory_uri() . '/assets/img/logo.png' ?>" alt="" class="navigation__logo">
			<a class="navigation__item" href="/">HOME</a>
			<a class="navigation__item" href="/ntsc">NTSC</a>
			<a class="navigation__item" href="/articles">Articles</a>
			<a class="navigation__item" href="/about">About</a>
		</nav>

		<?php $intro_cover = get_field('intro_cover', 'option'); ?>
		
		<?php if ($intro_cover['video_enabled']) { ?>
			<div class="background js-background">
				<!-- TODO: Change video basing on route (???) -->
				<video autoplay loop muted src="<?php echo $intro_cover['video'] ?>" class="js-video"></video>
				<canvas class="js-canvas"></canvas>
			</div>
		<?php } ?>

		
		<header class="intro js-intro <?php if ($intro_cover['video_enabled']) echo 'intro--fixed'; ?>" id=#intro"">	
			<div class="logo intro__logo js-logo">71 Pictures</div>
			<?php if (!$intro_cover['video_enabled']) { ?>
				<img class="intro__image" src="<?php echo $intro_cover['image']; ?>" alt="">
			<?php } ?>
		</header>

		<nav class="intro__socials">
			<ul class="list list--horizontal">
				<li class="list-item">
					<a href="" class="social-link js-social-link">
						<span class="social-link__icon">A</span>
					</a>
				</li>
				<li class="list-item">
					<a href="" class="social-link js-social-link">
						<span class="social-link__icon">A</span>
					</a>
				</li>
				<li class="list-item">
					<a href="" class="social-link js-social-link">
						<span class="social-link__icon">A</span>
					</a>
				</li>
				<li class="list-item">
					<a href="" class="social-link js-social-link">
						<span class="social-link__icon">A</span>
					</a>
				</li>
			</ul>
		</nav>
		
		<main id="main-region">
			