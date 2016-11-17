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
        filterDropdownObject: any;
        filterData: any;
        constructor($rootScope: ng.IRootScopeService, private requestor: IRequestor, private $scope: ng.IScope, private $timeout: ng.ITimeoutService, userDetails: IUserDetails) {
            this.appendedDataLength = 0;
            this.shortData = [];
            this.isPopupOpen = false;
            this.isDataLoaded = false;
            this.filterData = {};
            this.filterDropdownObject = {};
            this.isErrorOccured = false;
            userDetails.updateUserDetails(null, null);
            requestor.getAllData(this.loadData.bind(this));
            $rootScope.$on("appendOrders", this.appendData.bind(this));                                     // Listener to append order in grids
        }
        loadData(response: IResponse) {
            if (response.status === 200) {
                this.data = response.data;
                this.appendData(null, 40);
                this.isDataLoaded = true;
            } else if (response.status === 401) {
                window.location.pathname = "/login.html";
            } else {
                this.isErrorOccured = true;
            }
        }
        // Append new orders when scroll reches bottom
        appendData(event: any, appendNumber: number) {
            var totalAppend = appendNumber ? appendNumber : 20;
            for (var index = 0; index < totalAppend; index++) {
                if (this.data[index + this.appendedDataLength]) {
                    this.shortData.push(this.data[index + this.appendedDataLength]);
                }
            }
            this.appendedDataLength += index;
            this.$timeout(function () { this.$scope.$apply(); }.bind(this));
        }
        setPopupData(data: IOrder) {
            this.popupData = data;
            this.isPopupOpen = true;
        }
        toggleDropDown(data) {
            this.$timeout(function () {
                data.showDropDown = !data.showDropDown;
                this.dropDownData = data;
            }.bind(this));
        }
        updateState(data: IOrder, newState: string) {
            data.state = newState;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        }
    }
}