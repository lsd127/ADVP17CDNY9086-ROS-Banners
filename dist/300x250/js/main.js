
 // Following is a SuperClass for your app
var LTApp = function() {
    this.INITED = false;
};

 // Images preloading functions
LTApp.prototype = {
    preload: function(sources, callback) {
        this.sources = sources;
        var imgcount = 0,
            img;
        $('*').each(function(i, el) {
            if (el.tagName !== 'SCRIPT' && el.tagName !== 'feMergeNode') {
                this.findImageInElement(el);
            }
        }.bind(this));
        if (this.sources.length === 0) {
            callback.call();
        } else if (document.images) {
            for (var i = 0; i < this.sources.length; i++) {
                img = new Image();
                img.onload = function() {
                    imgcount++;
                    if (imgcount === this.sources.length) {
                        callback.call();
                    }
                }.bind(this);
                img.src = this.sources[i];
            }
        } else {
            callback.call();
        }
    },
    determineUrl: function(element) {
        var url = '';
        var t;
        var style = element.currentStyle || window.getComputedStyle(element, null);

        if ((style.backgroundImage !== '' && style.backgroundImage !== 'none') || (element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none')) {
            t = (style.backgroundImage || element.style.backgroundImage);
            if (t.indexOf('gradient(') === -1) {
                url = t.split(',');
            }
        } else if (typeof(element.getAttribute('src')) !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
            url = element.getAttribute('src');
        }
        return [].concat(url);
    },
    findImageInElement: function(element) {
        var urls = this.determineUrl(element);
        var extra = (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Opera/i)) ? '?rand=' + Math.random() : '';
        urls.forEach(function(url) {
            url = this.stripUrl(url);
            if (url !== '') {
                this.sources.push(url + extra);
            }
        }.bind(this));


    },
    stripUrl: function(url) {
        url = $.trim(url);
        url = url.replace(/url\(\"/g, '');
        url = url.replace(/url\(/g, '');
        url = url.replace(/\"\)/g, '');
        url = url.replace(/\)/g, '');
        return url;
    }
};
'use strict';

/**
 *
 * Main Application
 *
 **/

function App_banner() {
    if (App_banner.instance !== undefined) {
        return App_banner.instance;
    } else {
        App_banner.instance = this;
    }
    LTApp.call(this);
    return App_banner.instance;
}
App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;

/**
 *
 * Singleton thing
 *
 **/
App_banner.getInstance = function() {
    if (App_banner.instance === undefined) {
        new App_banner();
    }
    return App_banner.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_banner.fn.init = function() {
    if (!this.INITED) {
        this.INITED = true;

        /**
         * Add the images url you want to preload in the empty array on the first parameter
         */
        this.preload([], this.display.bind(this));
    }
};

/**
 *
 * shows everything, start animating
 *
 **/
App_banner.fn.display = function() {
    this.steps = $('.step');
    this.goTo(1);
    $('body').removeClass('loading');
    $('body').addClass('loaded');
};

/**
 *
 * Display the given step
 *
 */
App_banner.fn.goTo = function(stepNumber) {
    this.steps.each(function(i, el) {
        var $el = $(el);

        if ($el.data('order') == stepNumber) {
            $('.step-active').removeClass('step-active');
            $el.addClass('step-active');
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};

/**
 *
 * Display the given step
 *
 */

App_banner.fn.goToAndWait = function(stepNumber, seconds) {
    this.steps.each(function(i, el) {
        var $el = $(el);
        var $old;

        if ($el.data('order') == stepNumber) {
            $old = $('.step-active');
            $el.addClass('step-active');

            setTimeout(function() {
                $old.removeClass('step-active');
            }, seconds);
        }
    });

    if (this['step' + stepNumber]) {
        this['step' + stepNumber]();
    }
};


App_banner.fn.step1 = function() {

    // Variables
    var tl = new TimelineMax(),
        line1 = $('.animation-text1'),
        line2 = $('.text-intro'),
        text1 = $('.text-intro2'),
        disclaimer = $('.disclaimer'),
        text2 = $('.text2'),
        pills = $('.pills'),
        text3 = $('.text3'),
        logo = $('.logo'),
        link = $('.link'),
        disclaimer2 = $('.disclaimer2'),
        disclaimer3 = $('.disclaimer3'),
        scrollBar,
        isi1 = $('#isi'),
        isiMain = $('#isi-main'),
        mainExit = $('#mainExit'),
        myScroll;


    //Assign timeline to window to be able to test.
    window.tl = tl;

    //
    //Timeline Animation
    //
    var executionCount = 0;

    function checkCount() {
        executionCount++;
    }
    tl.addLabel('frame1')
        .to(line1, 0.5, { css: { 'left': '600' }, }, 'frame1+=0')

    .addLabel('frame2')
        .fromTo(line2, 1, { opacity: 0 }, { opacity: 1 })
        .to(line2, 1, { opacity: 0 })

    .addLabel('frame3')
        .to(text1, 1.5, { x: -375, ease: Power1.easeOut })
        .to(text1, 1.5, { opacity: 0 }, 'frame3+=2')
        .to(disclaimer, 1.5, { x: -100, ease: Power1.easeOut }, 'frame3')
        .to(disclaimer, 1.5, { opacity: 0 }, 'frame3+=2')

    .addLabel('frame4')
        .fromTo(text2, 1.5, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 })
        .to(text2, 1.5, { opacity: 0 })
        .to(pills, 1, { x: -300, ease: Power1.easeOut }, 'frame4')

    .addLabel('frame5')
        .fromTo(text3, 1.5, { scale: 0.1, opacity: 0 }, { scale: 1, opacity: 1 })
        .to(pills, 1, { x: -350, ease: Power1.easeOut }, 'frame5')
        .to(logo, 1, { x: -400, ease: Power1.easeOut }, 'frame5')
        .to(link, 1, { x: -300, ease: Power1.easeOut }, 'frame5')
        .to(disclaimer2, 1, { x: -200, ease: Power1.easeOut }, 'frame5')
        .to(disclaimer3, 1, { x: -200, ease: Power1.easeOut }, 'frame5')








    //
    // SCROLL
    //

    //Scroll init function. Keep disable options as they 
    function initScrollBars() {
        myScroll = new IScroll('#isi_wrapper', {
            scrollbars: 'custom',
            interactiveScrollbars: true,
            mouseWheel: true,
            momentum: true,
            disablePointer: true,
            disableTouch: false,
            disableMouse: true
        });
        window.myScroll = myScroll;
        scrollBar = $('.iScrollVerticalScrollbar');
    }

    // scroll init


    // Exits Listeners 
    mainExit.on('click', App_banner.fn.mainExitHandler);
    $('.pi').on('click', App_banner.fn.piExitHandler);

};

//Main Exit Handler
App_banner.fn.mainExitHandler = function(e) {
        e.preventDefault();
        Enabler.exit('Main Exit', 'http://google.com');
    }
    // Pi Exit handler
App_banner.fn.piExitHandler = function(e) {
    e.preventDefault();
    Enabler.exit('Prescribing Information and Medication Guide', 'http://google.com');
}