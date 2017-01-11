/**
 * Created by Julius Alvarado on 12/10/2016.
 */

jQuery(function () {
    jQuery(window).on('load resize', function () {
        jQuery('.fill-screen').css('height', window.innerHeight);

        // for half the window height, the elem will be at top of view
        jQuery('.half-screen').css('height', (window.innerHeight/2) );
    });

    jQuery('body').scrollspy({
        target: '.navbar',
        offset: 160
    });

    jQuery('nav a, .down-button a').bind('click', function (e) {
        jQuery('html, body').stop().animate({
            scrollTop: jQuery(jQuery(this).attr('href')).offset().top - 100
        }, 1500, 'easeInOutExpo');
        e.preventDefault();
    });

    new WOW().init();

    /* video wallpaper */
    jQuery('#vid-element').wallpaper({
        source: {
            poster: 'img/cup-coffee-md.jpg',
            mp4: 'img/squares.mp4'
        }
    });

    //jQuery(window).stellar();

    // own carousel code
    jQuery('.skill-carousel').owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        autoHeight: true,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: 'fadeUp'
    });

    // Form Handling Code

    /* ---------------------------------------------- /*
                    E-mail validation
    /* ---------------------------------------------- */

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    /* ---------------------------------------------- /*
     * Contact form ajax
     /* ---------------------------------------------- */

    jQuery("#contact-form").submit(function (e) {

        e.preventDefault();

        console.log("ja - in .submit()");
        var c_name = jQuery("#c_name").val();
        var c_email = jQuery("#c_email").val();
        var c_message = jQuery("#c_message ").val();
        var responseMessage = jQuery('.ajax-response');

        if (( c_name == "" || c_email == "" || c_message == "") || (!isValidEmailAddress(c_email) )) {
            responseMessage.fadeIn(500);
            responseMessage.html('<i class="fa fa-warning"></i> Check all fields.');
        }

        else {
            jQuery.ajax({
                type: "POST",
                url: "php/contactForm.php",
                dataType: 'json',
                data: {
                    c_email: c_email,
                    c_name: c_name,
                    c_message: c_message
                },
                beforeSend: function (result) {
                    $('#contact-form button').empty();
                    $('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
                },
                success: function (result) {
                    if (result.sendstatus == 1) {
                        responseMessage.html(result.message);
                        responseMessage.fadeIn(500);
                        $('#contact-form').fadeOut(500);
                    } else {
                        $('#contact-form button').empty();
                        $('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
                        responseMessage.html(result.message);
                        responseMessage.fadeIn(1000);
                    }
                }
            });
        }

        return false;

    }); // end of $('#contact-form').submit(); ^_^
});

//\\