module OrderProject {
    export class Requestor implements IRequestor {
        constructor(private $http: ng.IHttpService, private userDetails: IUserDetails) { }
        post = function (route: string, callBkFn: Function, data: any) {
            this.$http.post("http://localhost:54901/api/Order/" + route, data ? this.userDetails.getAppendedData(data) : this.userDetails.getUserCredentials())
                .then(callBkFn.bind(this))
                .catch(callBkFn.bind(this));
        }
        updateData = function (data: any, callBkFn: Function) {
            var apiStateUpdateUrl = "";
            this.$http.put(apiStateUpdateUrl, data)
                .then(callBkFn.bind(this))
                .catch(callBkFn.bind(this));
        }
        getAllData(callBkFn: Function) {
            this.post("getAllData", callBkFn, null);
        }
        getNextData(callBkFn: Function, data) {
            this.post("getNextData", callBkFn, data);
        }
        authenticateUser(callBkFn: Function) {
            this.post("Authenticate", callBkFn, null);
        }
    }
}