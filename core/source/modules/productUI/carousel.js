define(function (require) {
    var carousel;
    var YMAL;

    function init() {
        console.log('carousel init()');

        carousel = document.querySelector('.mProductImages');
        carousel.style.display = 'none';

        //YMAL = document.getElementById('mybuyspagezone1').getElementsByTagName('table');
        //console.log('YMAL: ' + YMAL)

        setTimeout(slickCarousel, 1000)
    }

    function slickCarousel() {
        console.log('slickCarousel()')
        carousel.style.display = 'block';
        $('.mProductImages').slick({infinite: false});
        //$('#mybuyspagezone1').find('table').slick({infinite: false});
    }

    $(document).ready(function () {
        init();
    });
});