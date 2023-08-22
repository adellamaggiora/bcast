export interface IUserInfo {
    username: string;
    readonly bcast: {
        toGet: number
        toSend: number
    }
}