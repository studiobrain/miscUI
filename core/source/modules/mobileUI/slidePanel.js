define([], function () {
    var SlidePanel = function (id, trigger) {
        console.log(id, trigger)
        var doc = document;
        var reveal = doc.querySelectorAll('.mSlider');

        getExits();

        if (trigger) {
            var triggerBtns = doc.querySelectorAll(trigger);
            for (var i = 0; i < triggerBtns.length; i++) {
                var btn = triggerBtns[i], myTap = new Tap(btn);
                triggerBtns[i].addEventListener('tap', revealSlide, false);
            }
        }

        function getExits(slider) {
            var exitBtns = doc.querySelectorAll('.exit');
            for (var i = 0; i < exitBtns.length; i++) {
                var exit = exitBtns[i], myTap = new Tap(exit);
                exit.addEventListener('tap', hideSlide, false);
            }
        }

        //used when the reveal cart is ready (items added to cart must wait for the success call to reveal)
        SlidePanel.prototype.revealAddToCart = function (panel) {
            console.log('revealAddToCart()');
            var slider = document.querySelector(panel);
            slider.style.display = 'block';
            TweenLite.to(slider, 0.4, {top: 0, transformOrigin: "left top", ease: Power4.easeInOut});
            getExits();
        }

        function revealSlide(event) {
            console.log('revealSlide()');

            for (var i = 0; i < reveal.length; i++) {
                if (reveal[i].id === id) {
                    reveal[i].style.display = 'block';
                    TweenLite.to(reveal[i], 0.4, {top: 0, transformOrigin: "left top", ease: Power4.easeInOut});
                }
            }
        }

        function hideSlide(event) {
            console.log('hideSlide()');
            for (var i = 0; i < reveal.length; i++) {
                TweenLite.to(reveal[i], 0.4, {top: '100%', transformOrigin: "left top", ease: Power4.easeInOut,
                onComplete:setDisplay, onCompleteParams:[reveal[i]]});
            }
        }

        function setDisplay(slide) {
            slide.style.display = 'none';
        }
    }

    return SlidePanel;
});
