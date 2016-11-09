// Directive for Infinite scroll
module OrderProject {
    export function infiniteScroll($window: any, $rootScope: ng.IRootScopeService) {
        return {
            restrict: "A",
            link: scrollHandler
        }
        function scrollHandler(scope, element, attrs) {
            angular.element(window).on("scroll", callOnBottom);

            function callOnBottom(event: any) {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    $rootScope.$emit("appendOrders");
                }
            }

        }
    }
}