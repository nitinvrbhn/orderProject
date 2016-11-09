declare module OrderProject {
    interface IResponse {
        data: any;
        status: number;
    }
    interface IRequestor {
        getData(callBkFn: Function): void;
        updateData(data: any, callBkFn: Function): void;
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
}