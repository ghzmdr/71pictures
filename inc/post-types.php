<?php 

function seventuonepictures_create_post_type() {
  register_post_type( 'article',
    array(
      'labels' => array(
        'name' => __( 'Articles' ),
        'singular_name' => __( 'Article' )
      ),
      'public' => true,
      'has_archive' => false,
      'supports' => array('title','author','thumbnail','excerpt', 'revisions', 'custom-fields'),
      'taxonomies' => array( 'article_types'),
      'rewrite'                    => array( 'slug' => 'articles' )
    )
  );
}
add_action( 'init', 'seventuonepictures_create_post_type' );

// Register Custom Taxonomy
function seventyone_custom_taxonomy() {

  $labels = array(
    'name'                       => 'Article Types',
    'singular_name'              => 'Article Type',
    'menu_name'                  => 'Article Types',
    'parent_item'        => null,
    'parent_item_column'     => null,
    'show_in_rest'         => true,
    'all_items'                  => 'All Article Types',
    'new_item_name'              => 'New Article Type',
    'add_new_item'               => 'Add New Article Type',
    'edit_item'                  => 'Edit Article Type',
    'update_item'                => 'Update Article Type',
    'view_item'                  => 'View Article Type'
  );

  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => false,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => true,
    'show_tagcloud'              => true,
  );
  register_taxonomy( 'article_types', array( 'article' ), $args );

}
add_action( 'init', 'seventyone_custom_taxonomy', 0 );
