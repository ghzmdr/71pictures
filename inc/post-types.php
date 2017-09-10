<?php 

function create_post_type() {
  register_post_type( 'main_project',
    array(
      'labels' => array(
        'name' => __( 'Main Projects' ),
        'singular_name' => __( 'Main Project' )
      ),
      'public' => true,
      'has_archive' => true,
      'supports' => array('title','author','thumbnail','excerpt')
    )
  );
}
add_action( 'init', 'create_post_type' );