<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Abel|Titillium+Web:400,700" rel="stylesheet">

<?php wp_head(); ?>
<base href="<?php echo get_template_directory_uri(); ?>/">

<?php
    global $wp;

    $og_url = home_url( $wp->request );

    $og_title = get_field('sharing_title', 'option');
    if (get_field('sharing_title')) {
        $og_title = get_field('sharing_title');
    }

    $og_description = get_field('sharing_description', 'option');
    if (get_field('sharing_description')) {
        $og_description = get_field('sharing_description');
    }

    $og_image = get_field('sharing_image', 'option');
    if (get_field('sharing_image')) {
        $og_image = get_field('sharing_image');
    }
?>

<meta property="og:url"                content="<?php $og_url; ?>" />
<meta property="og:title"              content="<?php $og_title; ?>" />
<meta property="og:description"        content="<?php $og_description; ?>" />
<meta property="og:image"              content="<?php $og_image; ?>" />
<script async src="assets/js/lazysizes.min.js"></script>
</head>

<?php
    // Some globals...
    $theme_uri = get_template_directory_uri();
?>

<body>

    <div id="seventyonepictures">
        <?php require_once 'parts/components/main-navigation.php' ?>
        <main id="region-main">
