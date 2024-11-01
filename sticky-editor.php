<?php
/*
Plugin Name: Sticky Editor
Plugin URL: 
Description: A simple plugin for sticky mceEditor. When we are writing content and the text grows the mceToolbar becomes a sticky element, so when necessary we can use the formatting options, without having to scroll to select the text and format, to scroll back and continue writing, so when the edit box out of the screen the mceToolbar also no longer visible.
Version: 1.4
Author: Carlos Miguel Silva
Author URI: 
*/

define('STICKY_EDITOR_PLUGIN_URL', plugin_dir_url( __FILE__ ));

// Add style to a Sticky div in mceEditor when scroll down
add_action('admin_head', 'bind_fixed_div_mceEditor');
function bind_fixed_div_mceEditor() {
	echo '<style type="text/css">
		    .fixed-div-mceEditor {
                position: fixed !important;
                top: 30px;
                width: 100%;
                max-width: 100%;
                background-color: #F5F5F5;
                z-index: 100;
                padding-right: 0px !important;
            }

            .rot-90 {
                -moz-transform:rotate(-270deg); 
                -moz-transform-origin: bottom left;
                -webkit-transform: rotate(-270deg);
                -webkit-transform-origin: bottom left;
                -o-transform: rotate(-270deg);
                -o-transform-origin: bottom left;
                filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
                position: fixed !important;
            }
		 </style>';
}


add_action('admin_enqueue_scripts', 'sticky_editor_admin_enqueue_scripts');
function sticky_editor_admin_enqueue_scripts() {
    global $pagenow;

    if($pagenow == 'post-new.php' || $pagenow == 'post.php'){
        wp_register_script('sticky-editor', STICKY_EDITOR_PLUGIN_URL.'/js/sticky-editor.js', array('jquery'));
        wp_enqueue_script('sticky-editor');
    }
	
}
