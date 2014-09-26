define(function (require) {
    var doc = document;
    var mContainer;
    var desc;
    var moreBtn;
    var height;
    var cartPanel;
    var availPanel;
    var incBtns;
    var decBtns;
    var mAddBtns;
    var mItemsSelected;
    var tempItems;
    var tempCount = 0;
    var isStacked = false;
    var footer;
    var footerCopy;
    var footerSec;
    var footerClone;
    var footerCopyClone;
    var footerSecClone;
    var cloned;
    var addToCartBtn;
    var utils = require('../common/utils');
    var breaks = require('../common/breakpoint-events');
    var tap = require('../mobileTap/tap');
    var SlidePanel = require('../mobileUI/slidePanel');

    function init() {
        console.log('shopUI init()');

        breaks.on('desktop', function () {

        });
        breaks.on('tablet', function () {
            if (desc) {
                console.log('adding setToAuto')
                desc.className += ' setToAuto';
            }

            cloneFooter(false);

        });
        breaks.on('mobile', function () {
            setupShop();

        })
    }

    function setupShop() {
        console.log('setupShop()')
        desc = doc.getElementById('readMoreDesc');
        moreBtn = doc.querySelector('.mReadMore');
        height = desc.offsetHeight;
        desc.classList.remove('setToAuto');
        desc.style.height = 90;
        moreBtn.style.marginTop = 0;
        mAddBtns = doc.querySelector('.add-to-buttons');
        mContainer = doc.getElementById('mContainer');
        mItemsSelected = doc.querySelector('.mItemsSelected');
        tempItems = doc.querySelector('span.tempItems');
        incBtns = doc.querySelectorAll('.mIncrement');
        decBtns = doc.querySelectorAll('.mDecrement');
        addToCartBtn = doc.querySelector('#addToCartButton');


        setupButtons();
        availPanel = new SlidePanel('clickPick', '.mCheckStore');
        cartPanel = new SlidePanel('addToCartModalContentContainer');
        var read = moreBtn, myTap = new window.Tap(read);
        read.addEventListener('tap', openReadMore, false);

        mContainer.addEventListener('scroll', checkCart);

        cloneFooter(true);


    }

    function cloneFooter(bool) {
        console.log(bool);

        if (bool == true) {
            footer = doc.querySelector('#footer');
            footerCopy = doc.querySelector('#footerCopyright');
            footerSec = doc.querySelector('#footerSecurity');

            mContainer.appendChild(footer);
            mContainer.appendChild(footerCopy);
            mContainer.appendChild(footerSec);

        }

    }


    function setupButtons() {
        for (var i = 0; i < incBtns.length; i++) {
            var inc = incBtns[i], myTap = new window.Tap(inc);
            inc.addEventListener('tap', incrementValue, false);

            var dec = decBtns[i], myTap = new window.Tap(dec);
            dec.addEventListener('tap', decrementValue, false);
        }

        var addToCart = addToCartBtn, myTap = new window.Tap(addToCart);
        addToCart.addEventListener('tap', checkForProducts, false);
    }

    function checkForProducts() {
        //runs a repeating check for item added to cart and the success returned call
        //refer to behaviors.js showAddToCartModal();
        console.log('checkForProducts()');
        var timerId = setInterval(function () {
            console.log('checking')
            if (typeof isAddedToCart !== 'undefined') {
                clearInterval(timerId);
                cartPanel.revealAddToCart('#addToCartModalContentContainer');
            }
        }, 1000);
    }

    function incrementValue(event) {
        var target = event.currentTarget;
        var imputValue = target.parentNode.getElementsByTagName('input')[0];
        var value = parseInt(imputValue.value, 10);

        value++;
        imputValue.value = value;

        mItemsSelected.style.display = 'block';

        if (isStacked == false) {
            mAddBtns.style.bottom = -mAddBtns.offsetHeight;
            mAddBtns.style.position = 'fixed';
            mAddBtns.className += ' mobile-grid-100';
            TweenLite.to(mAddBtns, 0.25, {bottom: -47, transformOrigin: "left top", ease: Power4.easeInOut});
            isStacked = true;
        }

        tempCount++;
        tempItems.innerHTML = tempCount.toString();
    }

    function decrementValue(event) {
        var target = event.currentTarget;
        var imputValue = target.parentNode.getElementsByTagName('input')[0];
        var value = parseInt(imputValue.value, 10);

        if (value != 0 && value > 0) {
            value--;
        }
        if (tempCount != 0) {
            tempCount--;

            if (tempCount == 0) {
                TweenLite.to(mAddBtns, 0.25, {bottom: -mAddBtns.offsetHeight, transformOrigin: "left top",
                    onComplete: resetAddBtns, ease: Power4.easeInOut});
                isStacked = false;
            }
        }

        imputValue.value = value;
        tempItems.innerHTML = tempCount.toString();
    }

    function resetAddBtns() {
        mAddBtns.classList.remove('mobile-grid-100');
        mAddBtns.style.bottom = 0;
        mAddBtns.style.position = 'relative';
        mItemsSelected.style.display = 'none';
    }

    function checkCart(event) {
        var element = event.currentTarget;
        var scrollTop = element.scrollTop;
        var cartBottom = mAddBtns.scrollTop;
        var elementOffset = mAddBtns.offsetTop;
        //info used to determine if the page has scrolled to the original placement of the cart buttons
        //thus allowing it to scroll with the rest of the page (no hang on the bottom)
    }

    function openReadMore(event) {
        var currentSection = event.currentTarget;

        if (currentSection.className.indexOf('open') == -1) {
            currentSection.className += ' open';
            TweenLite.to(desc, 0.4, {height: height, transformOrigin: "left top", ease: Power4.easeInOut});
            TweenLite.to(moreBtn, 0.4, {marginTop: 20, transformOrigin: "left top", ease: Power4.easeInOut});
        } else {
            currentSection.classList.remove('open');
            TweenLite.to(desc, 0.4, {height: 90, transformOrigin: "left top", ease: Power4.easeInOut});
            TweenLite.to(moreBtn, 0.4, {marginTop: 0, transformOrigin: "left top", ease: Power4.easeInOut});
        }
    }

    $(document).ready(function () {
        init();
    });
});



