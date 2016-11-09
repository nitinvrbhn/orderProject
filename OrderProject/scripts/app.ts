/// <reference path="directives/create-popup.directive.ts" />
/// <reference path="directives/infinite-scroll.directive.ts" />
/// <reference path="directives/show-hide-dropdown.directive.ts" />
/// <reference path="services/requestor.service.ts" />
/// <reference path="controllers/order.controller.ts" />

module OrderProject {
    export function start() {
        angular.module("OrderProject", [])
            .service("requestor", Requestor)
            .controller("OrderController", OrderController)
            .directive("createPopup", createPopup)
            .directive("infiniteScroll", infiniteScroll)
            .directive("showHide", showHide)
    }
}
OrderProject.start();