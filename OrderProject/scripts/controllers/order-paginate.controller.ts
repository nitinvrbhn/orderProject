module OrderProject {
    export class OrderPaginateController {
        shortData: Array<IOrder>;
        dropDownData: IOrder;
        isDataLoaded: boolean;
        isErrorOccured: boolean;
        pageNumber: number;
        filterDropdownObject: any;
        filterData: any;
        constructor($rootScope: ng.IRootScopeService, private requestor: IRequestor, private $scope: ng.IScope, private $timeout: ng.ITimeoutService, userDetails: IUserDetails) {
            this.shortData = [];
            this.pageNumber = 1;
            this.isDataLoaded = false;
            this.isErrorOccured = false;
            this.filterData = {};
            this.filterDropdownObject = {};
            userDetails.updateUserDetails(null, null);
            requestor.getNextData(this.loadData.bind(this), { pageNumber: this.pageNumber});
        }
        loadData(response: IResponse) {
            if (response.status === 200) {
                this.shortData = response.data;
                this.isDataLoaded = true;
            } else if (response.status === 401) {
                window.location.pathname = "/login.html";
            } else {
                this.isErrorOccured = true;
            }
        }
        getNextData(index: number) {
            this.pageNumber += index;
            this.requestor.getNextData(this.loadData.bind(this), { pageNumber: this.pageNumber });
        }
        toggleDropDown(data) {
            this.$timeout(function () {
                data.showDropDown = !data.showDropDown;
                this.dropDownData = data;
            }.bind(this));
            data.showDetails = !data.showDetails;
        }
        updateState(data: any, newState: string) {
            data.state = newState;
            data.showDetails = !data.showDetails;
            //this.requestor.updateData({ ID: data.orderId, state: newState }, null);                       // To be used when API is present for updating state
        }
        updateFilterState(data: any, newState: string) {
            data.state = newState;
        }
        toggleData(data: any) {
            data.showDetails = !data.showDetails;
        }
    }
}