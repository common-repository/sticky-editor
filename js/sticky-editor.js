/**
 * Sticky Editor
 *
 * @copyright Carlos Miguel Silva 2014
 *
 */
jQuery(window).on('scroll', function () {

    // WP_ADMINBAR ON vars
    var wpadminbar = jQuery('#wpadminbar').length > 0 ? jQuery('#wpadminbar').height() : 0;
    var editor_container_on_top = jQuery('#wp-content-editor-container').offset().top - wpadminbar;

    // VISUAL EDITOR vars
    var content_toolbargroup = jQuery('.mce-toolbar-grp').height();
    var visual_bars_height = wpadminbar + content_toolbargroup;

    // TEXT EDITOR vars
    var ed_toolbar = jQuery('#ed_toolbar').height();
    var text_bars_height = wpadminbar + ed_toolbar;


    if (jQuery(window).scrollTop() >= editor_container_on_top) {

        // STICKY EDITORS
        jQuery('.mce-toolbar-grp, #ed_toolbar')
            .addClass('fixed-div-mceEditor')
            .css('width', jQuery('#wp-content-editor-container').width() - 4);

        // CHECK WHO IS ACTIVE
        if (jQuery('.tmce-active').is(':visible')) {
            jQuery('#content-tmce').css({
                'background-color': '#222222',
                'width': '35px',
                'text-align': 'center',
                'box-shadow': '4px -5px 4px 0px #bbbbbb',
                'color': '#eeeeee'
            });
        } else {
            jQuery('#content-html').css({
                'background-color': '#222222',
                'width': '35px',
                'text-align': 'center',
                'box-shadow': '4px -5px 4px 0px #bbbbbb',
                'color': '#eeeeee'
            })
        }

        // ADDCLASS .rot-90 STYLING TABS
        jQuery('.wp-editor-tabs')
            .addClass('rot-90')
            .css({
                'top': '0px',
                'margin-left': jQuery('#wp-content-editor-tools').width()
            });

        // CHANGE STYLES WHEN CHANGE EDITOR
        jQuery('#content-tmce').click(function () {
            jQuery('#content-tmce').css({
                'background-color': '#222222',
                'width': '35px',
                'text-align': 'center',
                'box-shadow': '4px -5px 4px 0px #bbbbbb',
                'color': '#eeeeee'
            });
            jQuery('#content-html').css({
                'background-color': '',
                'box-shadow': '',
                'color': ''
            });
            jQuery('#content_toolbargroup').css({
                'width': jQuery('#content_tbl').width(),
                'background-color': '#F5F5F5'
            });
        });

        jQuery('#content-html').click(function () {
            jQuery('#content-html').css({
                'background-color': '#222222',
                'width': '35px',
                'text-align': 'center',
                'box-shadow': '4px -4px 5px 0px #bbbbbb',
                'color': '#eeeeee'
            });
            jQuery('#content-tmce').css({
                'background-color': '',
                'box-shadow': '',
                'color': ''
            });
        });

        // ADD ANIMATE ACTION TO ELEMENT
        jQuery('.mce-toolbar-grp, #ed_toolbar, .wp-editor-tabs')
            .stop()
            .animate({ opacity: 1 }, 500);

        var calculate = (jQuery('#wp-word-count').offset().top - jQuery(window).scrollTop());
        if (calculate <= visual_bars_height) {
            jQuery('.mce-toolbar-grp, .wp-editor-tabs')
                .stop()
                .animate({ opacity: 0 }, 500);
        }
        if (calculate <= text_bars_height) {
            jQuery('#ed_toolbar, .wp-editor-tabs')
                .stop()
                .animate({ opacity: 0 }, 500);
        }

    } else {
        // REMOVE EVERY STYLES AND CLASS's FROM ELEMENTS
        jQuery('.mce-toolbar-grp, #ed_toolbar')
            .removeClass('fixed-div-mceEditor')
            .css('width', '');
        jQuery('.wp-editor-tabs')
            .removeClass('rot-90')
            .removeAttr('style');
        jQuery('.wp-switch-editor, .tmce-active .switch-tmce, .html-active .switch-html').removeAttr('style');
        jQuery('#content-tmce, #content-html').off('click');
    }

});