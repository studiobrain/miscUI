define([], function () {
    var Accordion = function (sectionSelector, hiddenPortion) {

        var sections = document.querySelectorAll(sectionSelector);
        var hidden = document.querySelectorAll(hiddenPortion);

        for (var i = 0; i < sections.length; i++) {

            var el = sections[i], myTap = new window.Tap(el);
            el.addEventListener('tap', toggleSection, false);

            if (i == 0) {
                var acdnContainer = sections[0].parentNode;
                acdnContainer.className += ' mAccordion';
            }

            sections[i].className += ' acrdnHeader';

            if (hidden[i]) {
                hidden[i].className += ' hiddenPortion';
                hidden[i].style.marginTop = sections[i].childNodes[1].offsetHeight - 1;
            }
        }

        function toggleSection(event) {
            var currentSection = event.currentTarget;
            var arrow = currentSection.querySelector('span.arrow');

            var dropHeight = currentSection.querySelector('.hiddenPortion').offsetHeight;

            if (currentSection.className.indexOf('open') == -1) {
                TweenLite.to(currentSection, 0.25, {marginBottom: dropHeight});
                TweenLite.to(arrow, 0.25, {rotation: -180});
            } else {
                TweenLite.to(currentSection, 0.25, {marginBottom: 0});
                TweenLite.to(arrow, 0.25, {rotation: 0});
            }

            if (currentSection.className.indexOf('open') == -1) {
                currentSection.className += ' open';
            } else {
                currentSection.classList.remove('open');
            }
        }

        Accordion.prototype.shaveFooter = function (removal) {
            //hack the actual links from the accordion
            for (var i = 0; i < removal.length; i++) {
                removal.splice(i, 1);
            }
        }
    }

    return Accordion;
});
