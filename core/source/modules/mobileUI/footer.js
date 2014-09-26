define(function (require) {

    var doc = document;
    var footerNav;
    var Accordion;
    var accordion;
    var utils = require('../common/utils');
    var breaks = require('../common/breakpoint-events');
    var tap = require('../mobileTap/tap');

    function init() {
        console.log('footer init()')

        breaks.on('desktop', function () {

        });
        breaks.on('tablet', function () {
            resetFooter();

        });
        breaks.on('mobile', function () {
            setFooter();
        });
    }

    function setFooter() {
        console.log('loaded the mobile footer...')
        Accordion = require('./accordion');
        accordion = new Accordion('#footerNav ul', '.mAcrdnDrop');
        accordion.shaveFooter(['careers', 'investor']);
    }

    function resetFooter() {
        var removal = doc.querySelectorAll('.mAcrdnDrop');
        for (var i = 0; i < removal.length; i++) {
            if (removal[i].className.indexOf('hiddenPortion') != -1) {
                removal[i].classList.remove('hiddenPortion');
                removal[i].style.marginTop = 0;
            }
        }
    }

    $(document).ready(function () {
        init();
    });
});