/// Directive to create the popup
var OrderProject;
(function (OrderProject) {
    function createPopup() {
        return {
            restrict: "A",
            link: load
        };
    }
    OrderProject.createPopup = createPopup;
    function load(scope, element, attrs) {
        var createPopup = function () {
            var popupElement = document.createElement("div"), childWidth = element[0].children[0].offsetWidth, backdropElement = document.createElement("div");
            backdropElement.className = "backdrop";
            popupElement.className = "popupContainer";
            popupElement.style.left = "calc(50% - " + childWidth / 2 + "px)";
            popupElement.appendChild(element[0].children[0]);
            element.empty();
            element[0].appendChild(popupElement);
            disableScroll();
            document.onkeydown = function (e) { e.keyCode === 27 ? removePopup() : null; };
            angular.element(element[0].appendChild(backdropElement)).one("click", removePopup);
        };
        function removePopup() {
            scope.orderCtrl.isPopupOpen = false;
            scope.$apply();
        }
        function disableScroll() {
            angular.element(document.getElementsByTagName("body")).css("overflow", "hidden");
            angular.element(document.getElementsByTagName("body")).css('width', 'calc(100% - 17px)');
        }
        function destroyPopup() {
            angular.element(document.getElementsByTagName("body")).removeAttr("style");
            document.onkeydown = null;
        }
        createPopup();
        scope.$on("$destroy", destroyPopup);
    }
})(OrderProject || (OrderProject = {}));
// Directive for Infinite scroll
var OrderProject;
(function (OrderProject) {
    function infiniteScroll($window, $rootScope) {
        return {
            restrict: "A",
            link: scrollHandler
        };
        function scrollHandler(scope, element, attrs) {
            angular.element(window).on("scroll", callOnBottom);
            function callOnBottom(event) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    $rootScope.$emit("appendOrders");
                }
            }
        }
    }
    OrderProject.infiniteScroll = infiniteScroll;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    function showHide($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                var clickEvent = "click";
                $timeout(function () {
                    angular.element(document).one(clickEvent, function (event) {
                        scope.orderCtrl.dropDownData.showDropDown = false;
                        scope.$apply();
                    });
                    angular.element(element).on(clickEvent, function (event) {
                        event.stopPropagation();
                    });
                });
            }
        };
    }
    OrderProject.showHide = showHide;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var Requestor = (function () {
        function Requestor($http) {
            this.$http = $http;
            this.getData = function (callBkFn) {
                this.$http.get("http://localhost:55591/sample-order-dump.json")
                    .then(callBkFn.bind(this))
                    .catch(callBkFn.bind(this));
            };
            this.updateData = function (data, callBkFn) {
                var apiStateUpdateUrl = "";
                this.$http.put(apiStateUpdateUrl, data)
                    .then(callBkFn.bind(this))
                    .catch(callBkFn.bind(this));
            };
        }
        return Requestor;
    }());
    OrderProject.Requestor = Requestor;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var OrderController = (function () {
        function OrderController($rootScope, requestor, $scope, $timeout) {
            this.requestor = requestor;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.appendedDataLength = 0;
            this.shortData = [];
            this.isPopupOpen = false;
            this.isDataLoaded = false;
            this.isErrorOccured = false;
            requestor.getData(this.loadData.bind(this));
            $rootScope.$on("appendOrders", this.appendData.bind(this)); // Listener to append order in grids
        }
        OrderController.prototype.loadData = function (response) {
            if (response.status === 200) {
                this.data = response.data;
                this.appendData(null, 40);
                this.isDataLoaded = true;
            }
            else {
                this.isErrorOccured = true;
            }
        };
        // Append new orders when scroll reches bottom
        OrderController.prototype.appendData = function (event, appendNumber) {
            var totalAppend = appendNumber ? appendNumber : 20;
            for (var index = 0; index < totalAppend; index++) {
                this.shortData.push(this.data[index + this.appendedDataLength]);
            }
            this.appendedDataLength += index;
            this.$timeout(function () { this.$scope.$apply(); }.bind(this));
        };
        OrderController.prototype.setPopupData = function (data) {
            this.popupData = data;
            this.isPopupOpen = true;
        };
        OrderController.prototype.toggleDropDown = function (data) {
            data.showDropDown = !data.showDropDown;
            this.dropDownData = data;
        };
        OrderController.prototype.updateState = function (data, newState) {
            data.state = newState;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        };
        return OrderController;
    }());
    OrderProject.OrderController = OrderController;
})(OrderProject || (OrderProject = {}));
/// <reference path="directives/create-popup.directive.ts" />
/// <reference path="directives/infinite-scroll.directive.ts" />
/// <reference path="directives/show-hide-dropdown.directive.ts" />
/// <reference path="services/requestor.service.ts" />
/// <reference path="controllers/order.controller.ts" />
var OrderProject;
(function (OrderProject) {
    function start() {
        angular.module("OrderProject", [])
            .service("requestor", OrderProject.Requestor)
            .controller("OrderController", OrderProject.OrderController)
            .directive("createPopup", OrderProject.createPopup)
            .directive("infiniteScroll", OrderProject.infiniteScroll)
            .directive("showHide", OrderProject.showHide);
    }
    OrderProject.start = start;
})(OrderProject || (OrderProject = {}));
OrderProject.start();
//# sourceMappingURL=app.js.map