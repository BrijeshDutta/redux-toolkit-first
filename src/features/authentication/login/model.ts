
export type RequestUser = {
    email: string;
    password: string;
}

export interface User {
    email:string;
    username?:string;
    tokens?:Tokens;
    password?: string;
}




export type Tokens = {

    refresh:string;
    access:string;
}
