<?php
/**
 * 71 Pictures theme
 *
 * @link https://github.com/ghzmdr/71pictures
 */

/**
 * Setup
 */
function seventyone_pictures_setup() {

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );
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


// Custom post types
require_once("inc/post-types.php");


/*
 * Remove editor from pages by default.
 * Content is managed trough Custom Fields.
 */
function remove_editor() {
    remove_post_type_support( 'page', 'editor' );
}
add_action( 'init', 'remove_editor' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function seventyone_pictures_pingback_header() {
    if ( is_singular() && pings_open() ) {
        printf( '<link rel="pingback" href="%s">' . "\n", get_bloginfo( 'pingback_url' ) );
    }
}
add_action( 'wp_head', 'seventyone_pictures_pingback_header' );


function customize_admin() {
       if (!WP_DEBUG) remove_menu_page('edit.php');
       if (!WP_DEBUG) remove_menu_page('edit-comments.php');
       if (!WP_DEBUG) remove_menu_page('users.php');
       if (!WP_DEBUG) remove_menu_page('index.php');
       if (!WP_DEBUG) remove_menu_page('tools.php');
       if (!WP_DEBUG) remove_menu_page('options-general.php');
       if (!WP_DEBUG) remove_menu_page('edit.php?post_type=acf-field-group');
       if (!WP_DEBUG) remove_menu_page('themes.php');
       if (!WP_DEBUG) remove_menu_page('plugins.php');
}
add_action('admin_menu', 'customize_admin');


/**
 * Enqueue scripts and styles.
 */
function seventyone_pictures_scripts() {

    // Theme stylesheet.
    wp_enqueue_style( 'seventyone_pictures-style', get_stylesheet_uri(), array(), null );

    //Remove WP embed shit
    wp_deregister_script('wp-embed');

    // Main JS.
    wp_enqueue_script( 'seventyone_pictures-logic', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'seventyone_pictures_scripts' );


// Remove SHIT

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


// Remove admin bar
add_filter('show_admin_bar', '__return_false');

//Remove head link to comments
add_filter( 'feed_links_show_comments_feed', '__return_false' );

//Remove head link to comments
add_filter( 'feed_links_show_comments_feed', '__return_false' );
