var require = {
    baseUrl: 'https://localhost:9000/',
    paths: {
        jqueryLoader: 'libraries/jquery/jquery-loader',
        jquery: 'libraries/jquery/jquery',
		css: 'libraries/require/css',
        text: 'libraries/require/text',
        normalize: "libraries/require/normalize",
        underscore: 'libraries/underscore-min',
        backbone: "libraries/backbone-min",
        bootstrap: "libraries/bootstrap-min"
    },
    waitSeconds: 120,
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery','jqueryLoader'],
            exports: 'Backbone'
        },
        'bootstrap' : {
            deps: ['jquery','jqueryLoader']
        }
    }
};