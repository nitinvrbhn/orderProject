/**
 * File to implement routing
 */
module OrderProject {
    "use strict";
    export function appRouter($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when('/', {
                templateUrl: "templates/order-page.html"
            })
            .when('/paginate', {
                templateUrl: "templates/order-detail.html"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
}