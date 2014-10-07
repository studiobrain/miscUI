define(function (require) {
    function isDesktopSize() {
        if (getCurrentBreakpoint() === 'desktop') {
            return true;
        } else {
            return false;
        }
    }

    function isTabletSize() {
        if (getCurrentBreakpoint() === 'tablet') {
            return true;
        } else {
            return false;
        }
    }

    function isMobileSize() {
        if (getCurrentBreakpoint() === 'mobile') {
            return true;
        } else {
            return false;
        }
    }

    /*
     Reads the content property on the body:before as defined in the
     CSS file. Also strips out quotes which occur in Firefox and IE.
     http://www.csskarma.com/blog/responsive-javascript/
     */
    function getCurrentBreakpoint() {
        if (window.getComputedStyle) {
            return window.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/(\'|\")/g, '');
        } else {
            return 'desktop';
        }
    }

    return {
        isDesktopSize: isDesktopSize,
        isTabletSize: isTabletSize,
        isMobileSize: isMobileSize,
        getCurrentBreakpoint: getCurrentBreakpoint
    };
});