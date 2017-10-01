<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">

<?php wp_head(); ?>

<meta property="og:url"                content="<?php bloginfo('wpurl') ?>" />
<meta property="og:title"              content="<?php bloginfo('name') ?>" />
<meta property="og:description"        content="<?php bloginfo('description') ?>" />
<meta property="og:image"              content="<?php the_field('sharing_data', 'option')['image'] ?>" />
</head>

<body>

	<div id="seventyonepictures">
		<?php include_once "main-navigation.php" ?>

		<div class="relative-wrapper">			
			<?php include_once "cover.php" ?>
			<?php include_once "action-bar.php" ?>
			<?php include_once "button-trailer.php" ?>
		</div>
		
		<main id="main-region">
			