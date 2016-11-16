/// <reference path="directives/create-popup.directive.ts" />
/// <reference path="directives/infinite-scroll.directive.ts" />
/// <reference path="factory/userdetails.factory.ts" />
/// <reference path="directives/show-hide-dropdown.directive.ts" />
/// <reference path="services/requestor.service.ts" />
/// <reference path="router/approuter.router.ts" />
/// <reference path="controllers/login.controller.ts" />
/// <reference path="controllers/order.controller.ts" />
/// <reference path="controllers/order-paginate.controller.ts" />

module OrderProject {
    export function start() {
        angular.module("OrderProject", ["ngRoute"])
            .service("requestor", Requestor)
            .controller("OrderController", OrderController)
            .controller("OrderPaginateController", OrderPaginateController)
            .controller("LoginController", LoginController)
            .directive("createPopup", createPopup)
            .directive("infiniteScroll", infiniteScroll)
            .directive("showHide", showHide)
            .config(['$routeProvider', appRouter])
            .factory("userDetails", userDetails)
    }
}
OrderProject.start();