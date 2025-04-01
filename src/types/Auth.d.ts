interface IUser {
    id: string;
    email: string;
    name: string;
}

interface ILogin {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
    user: IUser;
}

export type { ILogin, IUser, ILoginResponse };