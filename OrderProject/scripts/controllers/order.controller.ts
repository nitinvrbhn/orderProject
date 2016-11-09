module OrderProject {
    export class OrderController {
        appendedDataLength: number;
        shortData: Array<IOrder>;
        data: Array<IOrder>;
        popupData: IOrder;
        dropDownData: IOrder;
        isPopupOpen: boolean;
        isDataLoaded: boolean;
        isErrorOccured: boolean;
        constructor($rootScope: ng.IRootScopeService, private requestor: IRequestor, private $scope: ng.IScope, private $timeout: ng.ITimeoutService) {
            this.appendedDataLength = 0;
            this.shortData = [];
            this.isPopupOpen = false;
            this.isDataLoaded = false;
            this.isErrorOccured = false;
            requestor.getData(this.loadData.bind(this));
            $rootScope.$on("appendOrders", this.appendData.bind(this));                                     // Listener to append order in grids
        }
        loadData(response: IResponse) {
            if (response.status === 200) {
                this.data = response.data;
                this.appendData(null, 40);
                this.isDataLoaded = true;
            } else {
                this.isErrorOccured = true;
            }
        }
        // Append new orders when scroll reches bottom
        appendData(event: any, appendNumber: number) {
            var totalAppend = appendNumber ? appendNumber : 20;
            for (var index = 0; index < totalAppend; index++) {
                this.shortData.push(this.data[index + this.appendedDataLength]);
            }
            this.appendedDataLength += index;
            this.$timeout(function () { this.$scope.$apply(); }.bind(this));
        }
        setPopupData(data: IOrder) {
            this.popupData = data;
            this.isPopupOpen = true;
        }
        toggleDropDown(data) {
            data.showDropDown = !data.showDropDown;
            this.dropDownData = data;
        }
        updateState(data: IOrder, newState: string) {
            data.state = newState;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        }
    }
}