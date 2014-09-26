define(function (require) {

    var doc = document;
    var container;
    var subContainer;
    var nav;
    var utils = require('../common/utils');
    var breaks = require('../common/breakpoint-events');
    var tap = require('../mobileTap/tap');

    function init() {
        console.log('main init()');

        breaks.on('desktop', function () {

        });
        breaks.on('tablet', function () {

        });
        breaks.on('mobile', function () {
            console.log("initialized the mobile UI...");
            runMain();
        });
    }

    function runMain() {
        console.log('loaded the mobile UI...');
        container = doc.getElementById('mContainer');
        subContainer = doc.getElementById('topNavigation');
        nav = doc.getElementById('mNav')

        var menuItems = doc.querySelectorAll('.menuItem');

        if (menuItems !== null) {
            for (var i = 0; i < menuItems.length; i++) {
                var el = menuItems[i], myTap = new window.Tap(el);
                menuItems[i].addEventListener('tap', revealSubNav, false);
            }
        }

        var menuBtn = doc.querySelector('.menuBtn');
        if (menuBtn !== null) {
            var menu = menuBtn, myTap = new window.Tap(menu);
            menuBtn.addEventListener('tap', changeMenuState, false);
        }

        var menuBack = doc.querySelector('.menuBack');
        if (menuBack !== null) {
            var backBtn = menuBack, myTap = new window.Tap(backBtn);
            menuBack.addEventListener('tap', returnMenu, false);
        }

        var searchBtn = doc.querySelector('.searchBtn');
        if (searchBtn !== null) {
            var search = searchBtn, myTap = new window.Tap(search);
            searchBtn.addEventListener('tap', revealSearch, false);
        }

        var cancelBtn = doc.getElementById('cancelSearch');
        if (cancelBtn !== null) {
            var cancel = cancelBtn, myTap = new window.Tap(cancel);
            cancelBtn.addEventListener('tap', cancelSearch, false);
        }

        var navBtns = doc.querySelectorAll('.navItem');
        if (navBtns !== null) {
            for (var i = 0; i < navBtns.length; i++) {
                var el = navBtns[i], myTap = new window.Tap(el);
                navBtns[i].addEventListener('tap', redirectNav, false);
            }
            reorderNav();
        }

    }

    function reorderNav() {
        var bottomControls = doc.getElementById('bottomControls');
        var liveChat = doc.getElementById('liveChat');
        var locations = doc.getElementById('locations');
        var ourBlog = doc.getElementById('ourBlog');
        var cart = doc.getElementById('cart');
        var shipTo = doc.getElementById('shipTo');
        var bottomControls = doc.getElementById('bottomControls');
        var topControls = doc.getElementById('topControls');
        var header = doc.getElementById('header');


        bottomControls.appendChild(cart);
        bottomControls.appendChild(ourBlog);
        bottomControls.appendChild(locations);
        bottomControls.appendChild(liveChat);
        bottomControls.appendChild(shipTo);

        header.appendChild(bottomControls);
        header.appendChild(topControls);
    }

    function redirectNav(event) {
        var item = event.currentTarget;
        var redirect;

        console.log('selected:' + item.id);
        switch (item.id) {
            case 'shop':
                console.log('shop');
                redirect = '/shop';
                _gaq.push(['_trackPageview', '/shop']);
                break;
            case 'locations':
                console.log('locations');
                redirect = '/locations/index.html';
                console.log(item.id, redirect);
                _gaq.push(['_trackPageview', '/locations/index.html']);
                break;
            case 'contact':
                redirect = '/contact/index.html';
                console.log(item.id, redirect);
                _gaq.push(['_trackPageview', '/contact/index.html']);
                break;
            case 'cart':
                redirect = '/cart/list.htm';
                console.log(item.id, redirect);
                _gaq.push(['_trackPageview', '/cart/list.htm']);
                break;
        }

        console.log("selected: " + item.id, redirect);
        window.location.href = redirect;
    }

    function changeMenuState(event) {
        console.log('changeMenuState()');
        var menuBtn = event.currentTarget;

        if (menuBtn.className.indexOf('revealed') == -1) {
            menuBtn.className += ' revealed';
            cancelSearch();
            TweenLite.to(container, 0.2, {marginLeft: "80%", transformOrigin: "left top", y: 0, ease: Power4.easeInOut});
        } else {
            menuBtn.classList.remove('revealed');
            TweenLite.to(container, 0.2, {marginLeft: "0", transformOrigin: "left top", y: 0, ease: Power4.easeInOut,
                onComplete: resetContainers});
        }
    }

    function resetContainers(event) {
        var subShop = doc.getElementById('subShop');
        var subElfa = doc.getElementById('subElfa');
        var subSale = doc.getElementById('subSale');

        subContainer.style.marginLeft = 0;

        console.log('resetContainers()');
        subShop.scrollTop = 0;
        subElfa.scrollTop = 0;
        subSale.scrollTop = 0;

        subShop.style.display = 'none';
        subElfa.style.display = 'none';
        subSale.style.display = 'none';
    }

    function returnMenu(event) {
        var btn = event.currentTarget;
        var width = subContainer.clientWidth;

        //lightenUp(btn);

        TweenLite.to(subContainer, 0.2, {marginLeft: 0, transformOrigin: "left top",
            y: 0, ease: Power4.easeInOut, onComplete: resetContainers});
    }

    function revealSearch(event) {
        var width = window.innerWidth;
        var searchBtn = event.currentTarget;
        console.log('revealSearch()');

        if (searchBtn.className.indexOf('revealed') == -1) {
            searchBtn.className += ' revealed';
            TweenLite.to(nav, 0.2, {marginLeft: -width, transformOrigin: "left top",
                y: 0, ease: Power4.easeInOut});
        } else {
            searchBtn.classList.remove('revealed');
            cancelSearch();
        }
    }

    function cancelSearch(searchBtn) {
        TweenLite.to(nav, 0.2, {marginLeft: 0, transformOrigin: "left top",
            y: 0, ease: Power4.easeInOut});
    }

    function revealSubNav(event) {
        var width = subContainer.clientWidth;
        var sub = event.currentTarget;
        var shop = doc.getElementById('subShop');
        var elfa = doc.getElementById('subElfa');
        var sale = doc.getElementById('subSale');

        console.log('revealSubNav(): ' + sub.id);
        //lightenUp(sub);

        switch (sub.id) {
            case 'mShopBtn':
                shop.style.display = 'block';
                elfa.style.display = 'none';
                sale.style.display = 'none';
                break;
            case 'mElfaBtn':
                shop.style.display = 'none';
                elfa.style.display = 'block';
                sale.style.display = 'none';
                break;
            case 'mSaleBtn':
                shop.style.display = 'none';
                elfa.style.display = 'none';
                sale.style.display = 'block';
                break;
        }

        TweenLite.to(subContainer, 0.2, {marginLeft: -width, transformOrigin: "left top",
            y: 0, ease: Power4.easeInOut});
    }

    function lightenUp(btn) {
        console.log(btn)
        btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
        TweenLite.delayedCall(0.4, function () {
            btn.style.backgroundColor = '#214ea1';
        });
    }

    $(document).ready(function () {
        init();
    });

});