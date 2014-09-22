/* Browser Plugin */

!function(a, b) {
    "use strict";
    var c, d;
    if (a.uaMatch = function(a) {
        a = a.toLowerCase();
        var b = /(opr)[\/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [], c = /(ipad)/.exec(a) || /(iphone)/.exec(a) || /(android)/.exec(a) || /(windows phone)/.exec(a) || /(win)/.exec(a) || /(mac)/.exec(a) || /(linux)/.exec(a) || /(cros)/i.exec(a) || [];
        return{browser: b[3] || b[1] || "", version: b[2] || "0", platform: c[0] || ""}
    }, c = a.uaMatch(b.navigator.userAgent), d = {}, c.browser && (d[c.browser] = !0, d.version = c.version, d.versionNumber = parseInt(c.version)), c.platform && (d[c.platform] = !0), (d.android || d.ipad || d.iphone || d["windows phone"]) && (d.mobile = !0), (d.cros || d.mac || d.linux || d.win) && (d.desktop = !0), (d.chrome || d.opr || d.safari) && (d.webkit = !0), d.rv) {
        var e = "msie";
        c.browser = e, d[e] = !0
    }
    if (d.opr) {
        var f = "opera";
        c.browser = f, d[f] = !0
    }
    if (d.safari && d.android) {
        var g = "android";
        c.browser = g, d[g] = !0
    }
    d.name = c.browser, d.platform = c.platform, a.browser = d
}(jQuery, window);

jQuery.fn.center = function() {

    this.each(function() {

        var $this = $(this);

        $this.css('margin', '0px auto');

        var parent_width = $this.parent().width();

        $this.css('margin-top', ($this.parent().height() - $this.height()) / 2 + 'px');

    });

    return this;
};

var insideMap = function() {



};

// Default Menu

$(document).on('scroll', function(e) {

    if (window.scrollY >= 100) {

        $("#frame-top-menu-wrap").addClass('on-move');

    } else {

        $("#frame-top-menu-wrap").removeClass('on-move');

    }

});

// Gallery

document.addEventListener('DOMContentLoaded', function() {
    if ($('.section-gallery').length > 1)
        Code.photoSwipe('a', '.section-gallery');
}, false);

// Affix

jQuery.fn.affix = function(_func) {

    if (typeof _func != 'function')
        _func = function() {
        };

    //

    var affix_index = [];

    $(this).each(function() {

        var $this = $(this),
                this_offset = $this.offset();

        affix_index.push([this, this_offset.top, this_offset.top + $this.outerHeight()]);

    });

    var diff_current = null;

    $(document).on('scroll', function(e) {

        var diff_max = null;

        for (i in affix_index) {

            var e = affix_index[i],
                    scroll_y = window.scrollY - $("#frame-top-menu-wrap").outerHeight();

            if (scroll_y >= e[1] && scroll_y <= e[2]) {

                diff_max = e[0];

            }

        }

        if (!diff_max) {

            _func(false);

            return false;

        }

        if (diff_current !== diff_max) {

            diff_current = diff_max;

            _func(diff_current);

        }

    });

};

function gen_uri(txt_src) {
 
     var output = txt_src.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").toLowerCase();
     /* remove first dash */
     if (output.charAt(0) == '-')
        output = output.substring(1);
     /* remove last dash */
     var last = output.length - 1;
     if (output.charAt(last) == '-')
        output = output.substring(0, last);
 
     return output;
}

$('.wp-page').each(function() {

    var seo_id = gen_uri(this.getAttribute('data-title'));

    this.setAttribute('data-seo-id', seo_id);

});

$('.wp-page').affix(function(_this) {

    /*
     
     if(!_this && $(document).height()/2 > window.scrollY){
     
     var $link = $('#frame-top-menu > ul > li:first > a');
     
     if(!$link.length)
     
     return false;
     
     $("#frame-top-menu li").removeClass('active');
     
     $link.parent().addClass('active');
     
     return false;
     
     }
     
     */

    if (!_this)
        return false;

    //

    $("#frame-top-menu li").removeClass('active');

    $link = $("#frame-top-menu a[data-page-id='" + _this.getAttribute('data-page-id') + "']");

    $link.parent().addClass('active');

    //

    var head_title = $('head > title'),
            head_title_source = head_title.prop('sourceText');

    if (!head_title_source) {

        head_title.prop('sourceText', head_title.text());

        head_title_source = head_title.text();

    }

    var this_title = _this.getAttribute('data-title'),
            this_title_seo = gen_uri(this_title);

    head_title.text(this_title + ' / ' + head_title_source);

    // document.location.hash = '#' + this_title_seo;


});

$("#frame-top-menu li:first").addClass('active');

$("#frame-top-menu li a").on('click', function() {

    var this_href = this.getAttribute('href'),
            $this_target = $(this_href),
            top_menu = $("#frame-top-menu-wrap").outerHeight();

    var pos_top = $this_target.offset().top - top_menu;

    $("html, body").animate({scrollTop: pos_top + "px"});

    return false;

});


// Mobile Menu

var mobile_menu_is_active = false;

$("#frame-top-header .menu-link").on('click', function() {

    var $top_menu = $("#frame-top-menu");

    if (!mobile_menu_is_active) {

        $top_menu.fadeIn('fast');

        mobile_menu_is_active = true;

    } else {

        $top_menu.fadeOut('fast');

        mobile_menu_is_active = false;

    }

    return false;

});

$(document.body).on('click', function(e) {

    if (mobile_menu_is_active) {

        if (!$(e.target).closest('#frame-top-menu').length) {

            $("#frame-top-menu").fadeOut('fast');

            mobile_menu_is_active = false;

        }

    }

});

// Map

var generateHash = function(length) {

    if (!length)
        length = 32;

    var _rand = function(min, max) {

        var argc = arguments.length;
        if (argc === 0) {
            min = 0;
            max = 2147483647;
        } else if (argc === 1) {
            throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    //

    var string = '',
            hash_arr = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; ++i) {

        var word_i = _rand(0, hash_arr.length - 1);

        string += hash_arr[word_i]

    }

    return string;


};

var mapGenerate = function(element_id, l1, l2) {

    var myLatlng = new google.maps.LatLng(l1 * 1, l2 * 1);
    var mapOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById(element_id), mapOptions);

    //=====Initialise Default Marker    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'marker'
                //=====You can even customize the icons here
    });

    //=====Initialise InfoWindow
    var infowindow = new google.maps.InfoWindow({
        content: "<B>Skyway Dr</B>"
    });

    //=====Eventlistener for InfoWindow
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

$('.google-map').each(function() {

    if (!this.getAttribute('data-l1') && !this.getAttribute('data-l2'))
        return false;

    var $this = $(this),
            this_id = generateHash(32),
            this_l1 = this.getAttribute('data-l1'),
            this_l2 = this.getAttribute('data-l2');

    this.id = this_id;

    //

    google.maps.event.addDomListener(window, 'load', function() {

        mapGenerate(this_id, this_l1, this_l2);

    });

});

// Form Auto

var formMailingApiSend = function(mail, form_arr) {

    $.ajax({
        url: '//www.tidioelements.com/apiMail/send?domain=' + location.host + '&type=theme',
        type: 'POST',
        data: {
            mailAddress: null,
            mailData: JSON.stringify(form_arr)
        }
    }).done(function() {



    }).fail(function() {

    });

};

jQuery.fn.formMailing = function() {

    this.on('submit', function() {

        var form_err = 0,
                form_arr = [],
                form_email = this.getAttribute('data-email');

        $(this).find('.e-input').each(function() {

            var this_err = false;

            if (this.getAttribute('data-required') && this.getAttribute('data-required') == '1') {

                if (this.getAttribute('data-type') == 'email' && this.value.indexOf('@') == -1 && this.value.indexOf('.') == -1) {

                    this_err = true;

                } else if (!this.value) {

                    this_err = true;

                }

            }

            //

            if (this_err) {
                $(this).addClass('input-error');

                form_err += 1;

            } else {
                $(this).removeClass('input-error');

                form_arr.push([this.placeholder, this.value]);

            }



        });

        if (!form_err) {

            $(this).find('.alert-success').slideDown('fast').delay(2000).slideUp(2000);

            this.reset();

            //

            if (form_email && form_email.indexOf('@') > -1 && form_email.indexOf('.') > -1 && form_email.length > 3) {

                formMailingApiSend(form_arr);

            }


        } else {

            console.log('form :: is error');

        }

        return false;


    });

};

$(".form-auto").each(function() {

    $(this).formMailing();

});


//Glide slider

//$('.content .slider').glide({
//    autoplay: false,
//    arrows: 'body',
//    arrowLeftText: '&#8592;',
//    arrowRightText: '&#8594;',
//    navigation: false
//});

/**
 * Magnific popup for extra posts
 */

$(document).on('click', '.read-more, .post-nav a', function(e) {
    e.preventDefault();
//    $.magnificPopup.close();
    var href = $(this).attr('href');
    $(this).magnificPopup({
        type: 'ajax',
        mainClass: 'mfp-zoom-in',
        removalDelay: 1000,
        tLoading: ''
    }).magnificPopup('open');
});

/**
 * Load more posts
 */
$('.load-more-posts').removeClass('hide');
$('.text-more-posts').addClass('hide');
$('.load-more-posts').click(function() {
    //add loading animation
    var $link = $(this);
    $link.addClass('loading');
    var link_text = $link.text();
    $link.text('|');
    var url = template_url + '/loopHandler.php';
    var page = $('.posts-wrapper .post').length / 4 + 1;
    $.get(url, {
        numPosts: 4,
        pageNumber: page,
    }, function(data) {
        if (data.length == 0) {
            $link.remove();
        } else {
            $('.text-more-posts').before(data);
            $link.text(link_text);
            $link.removeClass('loading');
        }
    });
});

/**
 * Paginated posts
 */

// Slider

var $slides = $("#frame-top .slider .slide");

if ($slides.length) {

    $slides.first().addClass('active');

    if ($slides.length > 1) {

        $("#frame-top .slider").addClass('btn-active');

    }


}

$("#frame-top .slider .btn-slider").on('click', function() {

    var $this = $(this),
            $slide_active = $("#frame-top .slider .slide.active"),
            $slide_target = null;

    if ($this.hasClass('btn-slider-left')) { // left

        if ($slide_active.prevAll('.slide').length) {

            $slide_target = $slide_active.prev('.slide');

        } else {

            $slide_target = $slides.last();

        }

    } else { // right

        if ($slide_active.nextAll('.slide').length) {

            $slide_target = $slide_active.next('.slide');

        } else {

            $slide_target = $slides.first();

        }

    }
    if (!$slide_target)
        return false;

    //

    $slide_active.fadeOut('fast', function() {

        $slide_active.removeClass('active');

        // $slide_target.css('height', $slide_target.outerHeight() + 'px');

        $slide_target.fadeIn('fast', function() {

            $slide_target.addClass('active');

        });

    });


    return false;

});

// Features

var featuresSection = function() {

    $('.section-features').each(function() {

        var this_height = 0;

        $(this).find('.e').each(function() {

            if ($(this).outerHeight() > this_height) {

                this_height = $(this).outerHeight();

            }

        });

        $(this).find('.e').css('height', this_height + 'px');

    });

};

$(window).on('resize', function() {

    featuresSection();
    footerPositionFix();

});

//footer fix
function footerPositionFix() {
    $('html').removeClass('footer-fix');
    var w_height = $(window).height();
    var body_height = $('body').height();
    if (body_height < w_height)
        $('html').addClass('footer-fix');
}
footerPositionFix();

// Animate Scroll

var initAnimatePosition = function() {

    $('.animate').each(function() {

        var $this = $(this),
                this_pos = $this.offset();

        $(this).prop('posTop', this_pos.top).attr('data-top', this_pos.top);

        // console.log(this, this_pos.top);


    });

}

var animateElements = function() {

    var y_start = window.scrollY,
            y_end = y_start + $(window).height();

    $('.animate:not(.activated)').each(function() {

        if (typeof this.posTop == 'undefined')
            return true;

        //

        var y_value = this.posTop;

        if (y_start <= y_value && y_end >= y_value) {

            $(this).addClass('activated');

        }

    });

};

$(document).on('scroll', function() {

    animateElements();

});

/* prices */

var updatePrices = function() {

    $('.prices-wrap').each(function() {

        var $prices = $(this).find('.prices'),
                max_height = 0;

        $prices.each(function() {

            var this_height = $(this).outerHeight();

            if (this_height > max_height) {

                max_height = this_height;

            }

        });

        $(this).prev('.prices-wrap-fake').css({
            height: max_height + 'px'
        });

        /*
         
         $prices.each(function(){
         
         var this_height = $(this).outerHeight();
         
         if(max_height > this_height){
         
         $(this).css('margin-top', max_height-this_height + 'px');
         
         }
         
         });
         
         */

    });

};

// Last Tweets

var initLastTweets = function() {

    if (!$("#footer-twitter").length || !$("#footer-twitter").attr('data-twitter-login')) {

        $("#footer-twitter").hide();

        return false;

    }

    var twitter_user = $("#footer-twitter").attr('data-twitter-login'),
            twitter_followers = null;

    //

    $("#footer-last-tweets").html('<div class="status loading">loading...</div>').center();

    $.getJSON('http://apps.tidioelements.com/tweets/?twitterUser=' + twitter_user, function(data) {

        var html = '';

        if (!data || !data.status || !data.value) {

            // err - loading err

            html = '<div class="status">loading error</div>';

        } else if (!data.value.length) {

            // err - no tweets

            html = '<div class="status no-tweets">no tweets</div>';

        } else {

            // default loading

            for (var i = 0; i < 2; ++i) {

                var e = data.value[i];

                html += '<div class="tweet"> <div class="tweet-text">' + e.text + '</div></div>';

                //

                if (e.user['screen_name'] == twitter_user) {

                    twitter_followers = e.user['followers_count'];

                }

                if (twitter_followers !== null) {

                    if (twitter_followers > 1000) {

                        twitter_followers = Math.round(twitter_followers / 1000) + 'k';

                    }

                    console.log('twitter_followers', twitter_followers);

                    $("#footer-twitter-follow-btn > .number").fadeIn('fast').text(twitter_followers);

                }

            }

        }

        $("#footer-last-tweets").html(html).center();

        // 

        $("#footer-twitter-login").text('@' + twitter_user);

        $("#footer-twitter-follow-btn").attr('href', 'https://twitter.com/' + twitter_user);

    });

};


// JS Min Height

var jsMinHeight = function() {

    var window_min_height = $(window).height() - $("#frame-top-menu-wrap").height();

    $('.js-min-screen-height').each(function() {

        $(this).css('min-height', window_min_height + 'px');

    });

}

//

$(document).ready(function() {

    $('.contact-form .e-50 + .e-50').each(function() {

        $(this).after('<div style="clear: both;"></div>');

    });

    //

    $('body').addClass('browser-' + $.browser.name);

    //

});

$(window).load(function() {

    initAnimatePosition();

    animateElements();

    //

    initLastTweets();

    updatePrices();

    $('.js-veritical-center').center();

    //

    if (location.hash && location.hash.length > 2) {

        var $ele = $('.wp-page[data-seo-id=\'' + location.hash.substr(1) + '\']');

        if ($ele.length) {

            $('body').scrollTop($ele.offset().top);

        }

    }



});

$(window).on('resize', function() {

    initAnimatePosition();

    updatePrices();

    $('.js-veritical-center').center();

});





