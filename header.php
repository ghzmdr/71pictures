<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Overpass+Mono|Titillium+Web:400,700" rel="stylesheet">

<?php wp_head(); ?>
<base href="<?php echo get_template_directory_uri(); ?>/">

<meta property="og:url"                content="<?php bloginfo('wpurl') ?>" />
<meta property="og:title"              content="<?php bloginfo('name') ?>" />
<meta property="og:description"        content="<?php bloginfo('description') ?>" />
<meta property="og:image"              content="<?php the_field('sharing_data', 'option')['image'] ?>" />
</head>

<?php
    // Some globals...
    $theme_uri = get_template_directory_uri();
?>

<body>

    <div id="seventyonepictures">
        <?php require_once 'parts/components/main-navigation.php' ?>
        <main id="region-main">
