
// Contains properties returned from the server:
export interface IUser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
}

// form values for login/registering -- sent UP to the server:
export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}