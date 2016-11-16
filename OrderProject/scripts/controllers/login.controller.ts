module OrderProject {
    export class LoginController {
        name: string;
        password: string;
        userDetails: IUserDetails;
        requestor: IRequestor;
        error: boolean;
        constructor(userDetails: IUserDetails, requestor: IRequestor) {
            this.userDetails = userDetails;
            this.requestor = requestor;
        }
        submitPassword() {
            this.error = false;
            this.userDetails.updateUserDetails(this.name, this.password)
            this.requestor.authenticateUser(this.redirect.bind(this));
        }
        redirect(response: IResponse) {
            if (response.status === 200 && response.data) {
                var d = new Date();
                d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = "name=" + this.name + ",password=" + this.password + ";" + expires + ";path=/";
                window.location.pathname = "/index.html";
            } else {
                this.error = true;
            }
        }
        reset() {
            this.name = "";
            this.password = "";
        }
    }
}