$(document).ready(function() {
    "use strict";

    // Smooth Scroll Easing
    $('a.page-scroll').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    // Menu Click Close
    $('.sidebar-nav li a').on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Closes the sidebar menu
    $("#menu-close").on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").on("click", function() {
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Stats
    $('#stats').appear(function() {
      var percent_number_step = $.animateNumber.numberStepFactories.append('%')
        $('.stat1').animateNumber({
            number: 100,
            numberStep: percent_number_step
        }, 1500);
        $('.stat2').animateNumber({
            number: 100,
            numberStep: percent_number_step
        }, 1700);
        $('.stat3').animateNumber({
            number: 100,
            numberStep: percent_number_step
        }, 1850);
    }, {
        accX: 0,
        accY: -200
    });

    // Skills
    $('#skills').appear(function() {
        $('.skill-bar').removeClass("skill-anim");
    }, {
        accX: 0,
        accY: -200
    });

    // Validate contact form
    $('#contact').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Escribí tu nombre aquí",
                minlength: "Al menos 2 carácteres"
            },
            email: {
                required: "Ingresá tu E-Mail"
            },
            message: {
                required: "Escriba algo para enviar",
                minlength: "Eso es todo? De verdad?"
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact.php",
                success: function() {
                    $('#contact :input').attr('disabled', 'disabled');
                    $('#contact').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contact').fadeTo("slow", 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });

});
