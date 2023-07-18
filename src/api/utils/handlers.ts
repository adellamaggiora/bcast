import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from '../dto/input-dto';
import { AuthResponse, PostgrestSingleResponse, RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { IBcast } from "src/interfaces/bcast";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { UserAuth } from "src/interfaces/user-auth";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawListedBcast } from "src/interfaces/raw/raw-listed-bcast";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";

const _errorHandler = ({ error }, errors?: string[]) => {
    if (error || errors) {
        throw error.message || `Generic API error`;
    }
}

const messageListHandler = (response: PostgrestSingleResponse<IRawMessage[]>): IMessage[] => {
    _errorHandler(response);
    const messageList: IMessage[] = response?.data?.map(inputDto.buildMessage);
    return messageList;
}

const messageInsertedHandler = (response: RealtimePostgresInsertPayload<{ [key: string]: any }>): IMessage => {
    _errorHandler(null, response?.errors);
    const rawMessage = response?.new as IRawMessage;
    const message: IMessage = inputDto.buildMessage(rawMessage);
    return message;
}

const bcastListHandler = (response: PostgrestSingleResponse<IRawListedBcast[]>): IListedBcast[] => {
    _errorHandler(response);
    const bcastList: IListedBcast[] = response?.data?.map(inputDto.buildListedBcast);
    return bcastList;
}

const bcastHandler = (response: PostgrestSingleResponse<any>): IBcast => {
    _errorHandler(response);
    const bcast: IBcast = inputDto.buildBcast(response?.data);
    return bcast;
}

const userInfoHandler = (response: PostgrestSingleResponse<{[x: string]: any}[]>): IUserInfo => {
    _errorHandler(response);
    const data = response?.data?.at(0) as IRawUserInfo;
    const userInfo: IUserInfo = inputDto.buildUserInfo(data);
    return userInfo;
}

const authHandler = (response: AuthResponse): UserAuth => {
    _errorHandler(response);
    const userAuth: UserAuth = inputDto.buildUserAuth(response?.data);
    return userAuth; 
}

const dataHasLengthHandler = (response: PostgrestSingleResponse<any>) => {
    _errorHandler(response);
    const dataHasLength: boolean = response?.data?.length > 0;
    return dataHasLength;
}


export default {
    messageListHandler,
    messageInsertedHandler,
    bcastListHandler,
    bcastHandler,
    userInfoHandler,
    authHandler,    
    dataHasLengthHandler
}


