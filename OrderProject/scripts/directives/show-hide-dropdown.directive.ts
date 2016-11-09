module OrderProject {
    export function showHide($timeout: ng.ITimeoutService) {
        return {
            restrict: "A",
            link: function (scope: any, element, attr) {
                var clickEvent: any = "click";
                $timeout(function () {
                    angular.element(document).one(clickEvent, function (event: MouseEvent) {
                        scope.orderCtrl.dropDownData.showDropDown = false;
                        scope.$apply();
                    })
                    angular.element(element).on(clickEvent, function (event: MouseEvent) {
                        event.stopPropagation();
                    })
                });
            }
        }
    }
}