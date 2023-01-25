export interface ISubmitForm{
    amount?: number;
    installments?: number;
    mdr?: number;
    length?: number;
    1?:number;
    15?:number;
    30?:number;
    90?:number;
}

export interface IInputForm{
    htmlFor: string
    label: string;
    name: string;
    type: string;
    register: any;
}