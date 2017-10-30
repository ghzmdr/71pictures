<?php 

function seventuonepictures_create_post_type() {
  register_post_type( 'article',
    array(
      'labels' => array(
        'name' => __( 'Articles' ),
        'singular_name' => __( 'Article' )
      ),
      'public'        => true,
      'has_archive'   => 'articles',
      'supports'      => array('title','author','thumbnail','excerpt', 'revisions', 'custom-fields'),
      'rewrite'       => array( 'slug' => 'articles/%article_types%', 'with_front' => false ),
      'show_in_rest'       => true,
      'rest_base'          => 'articles',
      'rest_controller_class' => 'WP_REST_Posts_Controller',
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
    'parent_item'                => null,
    'parent_item_column'         => null,
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
    'rewrite'   => array( 
      'slug' => 'articles', 
      'with_front' => false 
    ),
    'show_in_rest'       => true,
    'rest_base'          => 'article-types',
    'rest_controller_class' => 'WP_REST_Terms_Controller',
  );

  register_taxonomy( 'article_types', array( 'article' ), $args );

}
add_action( 'init', 'seventyone_custom_taxonomy', 0 );

function seventyone_show_permalinks( $post_link, $post ){
    if ( is_object( $post ) && $post->post_type == 'article' ){
        $terms = wp_get_object_terms( $post->ID, 'article_types' );
        if( $terms ){
            return str_replace( '%article_types%' , $terms[0]->slug , $post_link );
        }
    }
    return $post_link;
}
add_filter( 'post_type_link', 'seventyone_show_permalinks', 1, 2 );


function my_allow_meta_query( $valid_vars ) {
  
  $valid_vars = array_merge( $valid_vars, array( 'meta_key', 'meta_value' ) );
  return $valid_vars;
}
add_filter( 'rest_query_vars', 'my_allow_meta_query' );