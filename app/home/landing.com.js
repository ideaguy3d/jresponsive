/**
 * Created by Julius Alvarado on 1/3/2017.
 */

(function(){
    "use strict";

    var app = angular.module('j3d-app');

    app.component('jaLanding', {
        templateUrl: 'home/landing.html',
        $routeConfig: [
            {path: '/home', component:'jaHome', name: 'Home'},
            {path: '/**', redirectTo: ['Home']}
        ]
    });

    console.log("ja - landing.com.js called");
}());

//\\