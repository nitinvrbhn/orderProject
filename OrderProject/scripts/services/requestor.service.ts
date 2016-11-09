module OrderProject {
    export class Requestor implements IRequestor {
        constructor(private $http: ng.IHttpService) { }
        getData = function (callBkFn: Function) {
            this.$http.get("http://assets.limetray.com/assets/frontend-assignment/sample-order-dump.json")
                .then(callBkFn.bind(this))
                .catch(callBkFn.bind(this));
        }
        updateData = function (data: any, callBkFn: Function) {
            var apiStateUpdateUrl = "";
            this.$http.put(apiStateUpdateUrl, data)
                .then(callBkFn.bind(this))
                .catch(callBkFn.bind(this));
        }
    }
}