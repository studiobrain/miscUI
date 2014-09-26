define(function (require) {
    var doc = document;
    var refineBtn;
    var sortBtn;
    var Accordion;
    var accordion;
    var SlidePanel;
    var refinePanel;
    var sortPanel;
    var utils = require('../common/utils');
    var breaks = require('../common/breakpoint-events');
    var tap = require('../mobileTap/tap');

    function init() {
        console.log('filters init()');
        breaks.on('desktop', function () {
            console.log('');
            console.log('******* BREAK for desktop *******');
        });
        breaks.on('tablet', function () {
            console.log('');
            console.log('******* BREAK for tablet *******');
        });
        breaks.on('mobile', function () {
            loadFilters();
            console.log('');
            console.log('******* BREAK for mobile (phone) *******');
        });

        if (utils.isMobileSize()) {
            loadFilters();
        } else {
            return;
        }
    }

    function loadFilters() {
        console.log('loaded the mobile filters...');
        SlidePanel = require('./slidePanel');
        Accordion = require('./accordion');

        refineBtn = doc.querySelector('.mRefine');
        sortBtn = doc.querySelector('.mSort');
        if (typeof isSortable === 'undefined') {
            console.log('not sortable...');
            if (sortBtn != null) {
                sortBtn.style.display = 'none';
            }
        } else {
            console.log('loaded the mobile sort filters button...');
            refineBtn.className += ' mBtnHalf mLeft';
            sortBtn.style.display = 'inline-block';

            sortPanel = new SlidePanel('sort', '.mSort');
        }

        if (refineBtn != null) {
            refinePanel = new SlidePanel('refine', '.mRefine');
        }

        accordion = new Accordion('.filter-section', '.filter-options');
    }

    $(document).ready(function () {
        init();
    });
});
