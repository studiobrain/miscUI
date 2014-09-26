({
    appDir: '../source',
    baseUrl: '.',
    removeCombined: true,
    //optimize: 'none',
    paths: {
        'jquery': 'empty:',
        'jquery.hoverIntent': 'empty:',
        'jquery.transit': 'empty:',
        'spin': 'lib/spin.min'
    },
    modules: [
        {
            name: 'lib/require',
            include: ['lib/require', 'lib/config']
        },
        {
            name: 'common',
            include: ['modules/common/utils', 'modules/common/breakpoint-events']
        },
        {
            name: 'tips',
            include: ['tips','modules/tips/main'],
            exclude: ['common']
        },
        {
            name: 'shop-filters',
            include: ['shop-filters','modules/shop-filters/main'],
            exclude: ['common']
        },
        {
            name: 'gift-cards',
            include: ['gift-cards','modules/gift-cards/main'],
            exclude: ['common']
        },
        {
            name: 'registry',
            include: ['registry','modules/registry/main'],
            exclude: ['common']
        },
        {
            name: 'elfa-landing',
            include: ['elfa-landing','modules/elfa-landing/main'],
            exclude: ['common']
        },
        {
            name: 'loyalty-program',
            include: ['loyalty-program'],
            exclude: ['common']
        },
        {
            name: 'mobileUI',
            include: ['mobileUI','modules/mobileUI/main',
                'modules/mobileUI/accordion',
                'modules/mobileUI/slidePanel'],
            exclude: ['common']
        },
        {
            name: 'mobileTap',
            include: ['mobileTap','modules/mobileTap/tap'],
            exclude: ['common']
        },
        {
            name: 'productUI',
            include: ['productUI','modules/productUI/slick.min',
                'modules/productUI/carousel'],
            exclude: ['common']
        },
        {
            name: 'tweenlite',
            include: ['tweenlite','modules/tweenlite/min',
                'modules/tweenlite/plugins/CSSPlugin.min',
                'modules/tweenlite/plugins/CSSRulePlugin.min'],
            exclude: ['common']
        }
    ]
})
