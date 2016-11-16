module OrderProject {
    export function userDetails(): IUserDetails {
        var name: string = "";
        var password: string = "";
        function getUserCredentials() {
            return {
                name: name,
                password: password
            }
        }
        function getAppendedData(dataObject: any) {
            var data: any = getUserCredentials();
            Object.keys(dataObject).forEach((key) => {
                data[key] = dataObject[key];
            })
            return data;
        }
        function updateUserDetails(userName: string, userPassword: string): void {
            if (userName && userPassword) {
                name = userName;
                password = userPassword
            } else {
                var nameString, passString;
                var data = document.cookie.split("; __")[0];
                nameString = data.split(",")[0];
                name = nameString.substring(nameString.indexOf("=") + 1, nameString.length)
                passString = document.cookie.split("; __")[0].substring(data.indexOf(",") + 1, data.length);
                password = passString.substring(passString.indexOf("=") + 1, passString.length);
            }
        }
        return {
            getUserCredentials: getUserCredentials,
            getAppendedData: getAppendedData,
            updateUserDetails: updateUserDetails
        }
    }
}