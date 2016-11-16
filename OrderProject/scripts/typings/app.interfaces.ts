declare module OrderProject {
    interface IResponse {
        data: any;
        status: number;
    }
    interface IRequestor {
        getAllData(callBkFn: Function): void;
        getNextData(callBkFn: Function, data): void;
        authenticateUser(callBkFn: Function): void;
    }
    interface IOrder {
        orderId: string;
        state: string;
        amount: string;
        createdAt: number;
        customer: ICustomer;
    }
    interface ICustomer {
        name: string;
        phone: string;
        address: string;
        latitude: number;
        longitude: number;
    }
    interface IUserCreds {
        name: string;
        password: string;
    }
    interface IUserDetails {
        getUserCredentials(): IUserCreds; 
        getAppendedData(dataObject: any): any;
        updateUserDetails(userName: string, userPassword: string): void;
    }
}