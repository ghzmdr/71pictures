<?php
/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function seventyone_pictures_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/seventyone_pictures
     * If you're building a theme based on Twenty Seventeen, use a find and replace
     * to change 'seventyone_pictures' to the name of your theme in all the template files.
     */
    load_theme_textdomain( 'seventyone_pictures' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );

    acf_add_options_page(array(
        'page_title'    => 'Site Options',
        'menu_title'    => 'Site Options',
        'menu_slug'     => 'site-options',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));


}
add_action( 'after_setup_theme', 'seventyone_pictures_setup' );

/*
 * seventyonepictures theme init hook
 */
function seventyone_pictures_init() {

    /*
     * Remove WYSIWYG editor from pages
     */
    remove_post_type_support( 'page', 'editor' );
}
add_action( 'init', 'seventyone_pictures_init' );

/**
 * Register custom fonts.
 */
function seventyone_pictures_fonts_url() {
    $fonts_url = '';

    $query_args = array(
        'family' => 'Share+Tech+Mono|Titillium+Web:400,700'
    );

    $fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );

    return esc_url_raw( $fonts_url );
}

/**
 * Add preconnect for Google Fonts.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param array  $urls           URLs to print for resource hints.
 * @param string $relation_type  The relation type the URLs are printed.
 * @return array $urls           URLs to print for resource hints.
 */
function seventyone_pictures_resource_hints( $urls, $relation_type ) {
    if ( wp_style_is( 'seventyone_pictures-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
        $urls[] = array(
            'href' => 'https://fonts.gstatic.com',
            'crossorigin',
        );
    }

    return $urls;
}
add_filter( 'wp_resource_hints', 'seventyone_pictures_resource_hints', 10, 2 );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function seventyone_pictures_pingback_header() {
    if ( is_singular() && pings_open() ) {
        printf( '<link rel="pingback" href="%s">' . "\n", get_bloginfo( 'pingback_url' ) );
    }
}
add_action( 'wp_head', 'seventyone_pictures_pingback_header' );

/**
 * Overwrite default stylesheet location
 */
function seventyone_pictures_stylesheet_directory($dir) {
    return $dir.'/assets/css';
}
add_filter('stylesheet_directory_uri', 'seventyone_pictures_stylesheet_directory' );

show_admin_bar( false );

/**
 * Enqueue scripts and styles.
 */
function seventyone_pictures_scripts() {
    // Add custom fonts, used in the main stylesheet.
    wp_enqueue_style( 'seventyone_pictures-fonts', seventyone_pictures_fonts_url(), array(), null );

    // Theme stylesheet.
    wp_enqueue_style( 'seventyone_pictures-style', get_stylesheet_uri(), array(), null );

    //Remove WP embed shit
    wp_deregister_script('wp-embed');

    // Load the html5 shiv.
    wp_enqueue_script( 'html5', get_theme_file_uri( '/assets/js/html5.js' ), array(), '3.7.3' );
    wp_script_add_data( 'html5', 'conditional', 'lt IE 9' );

    // Theme stylesheet.
    wp_enqueue_script( 'seventyone_pictures-logic', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'seventyone_pictures_scripts' );

function disable_wp_emojicons() {

  // all actions related to emojis
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

  // filter to remove TinyMCE emojis
  add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );

//Remove head link to comments
add_filter( 'feed_links_show_comments_feed', '__return_false' );

// Custom post types
require_once("inc/post-types.php");
