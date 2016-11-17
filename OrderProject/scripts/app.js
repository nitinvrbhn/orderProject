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
    function userDetails() {
        var name = "";
        var password = "";
        function getUserCredentials() {
            return {
                name: name,
                password: password
            };
        }
        function getAppendedData(dataObject) {
            var data = getUserCredentials();
            Object.keys(dataObject).forEach(function (key) {
                data[key] = dataObject[key];
            });
            return data;
        }
        function updateUserDetails(userName, userPassword) {
            if (userName && userPassword) {
                name = userName;
                password = userPassword;
            }
            else {
                var nameString, passString;
                var data = document.cookie.split("; __")[0];
                nameString = data.split(",")[0];
                name = nameString.substring(nameString.indexOf("=") + 1, nameString.length);
                passString = document.cookie.split("; __")[0].substring(data.indexOf(",") + 1, data.length);
                password = passString.substring(passString.indexOf("=") + 1, passString.length);
            }
        }
        return {
            getUserCredentials: getUserCredentials,
            getAppendedData: getAppendedData,
            updateUserDetails: updateUserDetails
        };
    }
    OrderProject.userDetails = userDetails;
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
                        scope[attr.controllerAlias].dropDownData.showDropDown = false;
                        scope.$apply();
                    });
                    if (attr.showHide !== "focus") {
                        angular.element(element).on(clickEvent, function (event) {
                            event.stopPropagation();
                        });
                    }
                });
            }
        };
    }
    OrderProject.showHide = showHide;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var Requestor = (function () {
        function Requestor($http, userDetails) {
            this.$http = $http;
            this.userDetails = userDetails;
            this.post = function (route, callBkFn, data) {
                this.$http.post("http://localhost:54901/api/Order/" + route, data ? this.userDetails.getAppendedData(data) : this.userDetails.getUserCredentials())
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
        Requestor.prototype.getAllData = function (callBkFn) {
            this.post("getAllData", callBkFn, null);
        };
        Requestor.prototype.getNextData = function (callBkFn, data) {
            this.post("getNextData", callBkFn, data);
        };
        Requestor.prototype.authenticateUser = function (callBkFn) {
            this.post("Authenticate", callBkFn, null);
        };
        return Requestor;
    }());
    OrderProject.Requestor = Requestor;
})(OrderProject || (OrderProject = {}));
/**
* File to implement routing
*/
var OrderProject;
(function (OrderProject) {
    "use strict";
    function appRouter($routeProvider) {
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
    OrderProject.appRouter = appRouter;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var LoginController = (function () {
        function LoginController(userDetails, requestor) {
            this.userDetails = userDetails;
            this.requestor = requestor;
        }
        LoginController.prototype.submitPassword = function () {
            this.error = false;
            this.userDetails.updateUserDetails(this.name, this.password);
            this.requestor.authenticateUser(this.redirect.bind(this));
        };
        LoginController.prototype.redirect = function (response) {
            if (response.status === 200 && response.data) {
                var d = new Date();
                d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "name=" + this.name + ",password=" + this.password + ";" + expires + ";path=/";
                window.location.pathname = "/index.html";
            }
            else {
                this.error = true;
            }
        };
        LoginController.prototype.reset = function () {
            this.name = "";
            this.password = "";
        };
        return LoginController;
    }());
    OrderProject.LoginController = LoginController;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var OrderController = (function () {
        function OrderController($rootScope, requestor, $scope, $timeout, userDetails) {
            this.requestor = requestor;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.appendedDataLength = 0;
            this.shortData = [];
            this.isPopupOpen = false;
            this.isDataLoaded = false;
            this.filterData = {};
            this.filterDropdownObject = {};
            this.isErrorOccured = false;
            userDetails.updateUserDetails(null, null);
            requestor.getAllData(this.loadData.bind(this));
            $rootScope.$on("appendOrders", this.appendData.bind(this)); // Listener to append order in grids
        }
        OrderController.prototype.loadData = function (response) {
            if (response.status === 200) {
                this.data = response.data;
                this.appendData(null, 40);
                this.isDataLoaded = true;
            }
            else if (response.status === 401) {
                window.location.pathname = "/login.html";
            }
            else {
                this.isErrorOccured = true;
            }
        };
        // Append new orders when scroll reches bottom
        OrderController.prototype.appendData = function (event, appendNumber) {
            var totalAppend = appendNumber ? appendNumber : 20;
            for (var index = 0; index < totalAppend; index++) {
                if (this.data[index + this.appendedDataLength]) {
                    this.shortData.push(this.data[index + this.appendedDataLength]);
                }
            }
            this.appendedDataLength += index;
            this.$timeout(function () { this.$scope.$apply(); }.bind(this));
        };
        OrderController.prototype.setPopupData = function (data) {
            this.popupData = data;
            this.isPopupOpen = true;
        };
        OrderController.prototype.toggleDropDown = function (data) {
            this.$timeout(function () {
                data.showDropDown = !data.showDropDown;
                this.dropDownData = data;
            }.bind(this));
        };
        OrderController.prototype.updateState = function (data, newState) {
            data.state = newState;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        };
        return OrderController;
    }());
    OrderProject.OrderController = OrderController;
})(OrderProject || (OrderProject = {}));
var OrderProject;
(function (OrderProject) {
    var OrderPaginateController = (function () {
        function OrderPaginateController($rootScope, requestor, $scope, $timeout, userDetails) {
            this.requestor = requestor;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.shortData = [];
            this.pageNumber = 1;
            this.isDataLoaded = false;
            this.isErrorOccured = false;
            this.filterData = {};
            this.filterDropdownObject = {};
            userDetails.updateUserDetails(null, null);
            requestor.getNextData(this.loadData.bind(this), { pageNumber: this.pageNumber });
        }
        OrderPaginateController.prototype.loadData = function (response) {
            if (response.status === 200) {
                this.shortData = response.data;
                this.isDataLoaded = true;
            }
            else if (response.status === 401) {
                window.location.pathname = "/login.html";
            }
            else {
                this.isErrorOccured = true;
            }
        };
        OrderPaginateController.prototype.getNextData = function (index) {
            this.pageNumber += index;
            this.requestor.getNextData(this.loadData.bind(this), { pageNumber: this.pageNumber });
        };
        OrderPaginateController.prototype.toggleDropDown = function (data) {
            this.$timeout(function () {
                data.showDropDown = !data.showDropDown;
                this.dropDownData = data;
            }.bind(this));
            data.showDetails = !data.showDetails;
        };
        OrderPaginateController.prototype.updateState = function (data, newState) {
            data.state = newState;
            data.showDetails = !data.showDetails;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        };
        OrderPaginateController.prototype.updateFilterState = function (data, newState) {
            data.state = newState;
        };
        OrderPaginateController.prototype.toggleData = function (data) {
            data.showDetails = !data.showDetails;
        };
        return OrderPaginateController;
    }());
    OrderProject.OrderPaginateController = OrderPaginateController;
})(OrderProject || (OrderProject = {}));
/// <reference path="directives/create-popup.directive.ts" />
/// <reference path="directives/infinite-scroll.directive.ts" />
/// <reference path="factory/userdetails.factory.ts" />
/// <reference path="directives/show-hide-dropdown.directive.ts" />
/// <reference path="services/requestor.service.ts" />
/// <reference path="router/approuter.router.ts" />
/// <reference path="controllers/login.controller.ts" />
/// <reference path="controllers/order.controller.ts" />
/// <reference path="controllers/order-paginate.controller.ts" />
var OrderProject;
(function (OrderProject) {
    function start() {
        angular.module("OrderProject", ["ngRoute"])
            .service("requestor", OrderProject.Requestor)
            .controller("OrderController", OrderProject.OrderController)
            .controller("OrderPaginateController", OrderProject.OrderPaginateController)
            .controller("LoginController", OrderProject.LoginController)
            .directive("createPopup", OrderProject.createPopup)
            .directive("infiniteScroll", OrderProject.infiniteScroll)
            .directive("showHide", OrderProject.showHide)
            .config(['$routeProvider', OrderProject.appRouter])
            .factory("userDetails", OrderProject.userDetails);
    }
    OrderProject.start = start;
})(OrderProject || (OrderProject = {}));
OrderProject.start();
//# sourceMappingURL=app.js.map