<?php?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.gstatic.com/Overpass+Mono|Titillium+Web:400,700" crossorigin>

<?php wp_head(); ?>

<meta property="og:url"                content="<?php bloginfo('wpurl') ?>" />
<meta property="og:title"              content="<?php bloginfo('name') ?>" />
<meta property="og:description"        content="<?php bloginfo('description') ?>" />
<meta property="og:image"              content="<?php the_field('sharing_data', 'option')['image'] ?>" />
</head>

<body>

    <div id="seventyonepictures">
        <main id="main-region">
