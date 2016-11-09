/// Directive to create the popup
module OrderProject {
    export function createPopup() {
        return {
            restrict: "A",
            link: load
        }
    }

    function load(scope, element, attrs) {
        var createPopup = function () {
            var popupElement = document.createElement("div"),
                childWidth = element[0].children[0].offsetWidth,
                backdropElement = document.createElement("div");

            backdropElement.className = "backdrop";
            popupElement.className = "popupContainer";
            popupElement.style.left = "calc(50% - " + childWidth / 2 + "px)";
            popupElement.appendChild(element[0].children[0]);
            element.empty();
            element[0].appendChild(popupElement);
            disableScroll();

            document.onkeydown = (e) => { e.keyCode === 27 ? removePopup() : null; };
            angular.element(element[0].appendChild(backdropElement)).one("click", removePopup);
        }

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
}