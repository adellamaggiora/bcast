// @ts-nocheck

import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import { IUserSession } from "src/interfaces/user-session";
import inputDto from "../dto/input-dto";
import { toast } from "./toast";

type ApiHandler<T> = (data: any) => T;

const errorHandler = (error: any) => {
    if (error) {
        toast.danger(`Api error: ${error?.message}`);
        throw error;
    }
}

const handleObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data);
const handleFirstObject = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : dto(data?.at(0));
const handleArray = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : data.map((_:any) => dto(_));
const handleInteractedBcast = (dto: Function) => ({ data, error }) => error ? errorHandler(error) : data.map((_:any) => dto(_.bcast))
const handlePostgresChangePayload = (dto: Function) => (payload) => payload?.errors? errorHandler({ message: 'Error postgres change payload' }) : dto(payload?.new);

const arrayBcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const arrayMessageHandler: ApiHandler<IMessage[]> = handleArray(inputDto.buildMessage);
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const dataHasLengthHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));
const interactedBcastHandler: ApiHandler<IBcast[]> = handleInteractedBcast(inputDto.buildBcast);
const messageInsertedHandler: ApiHandler<IMessage> = handlePostgresChangePayload(inputDto.buildMessage);
const authenticationHandler: ApiHandler<IUserSession> = handleObject(_ => inputDto.buildUserSession(_.session));

export default {
    arrayBcastHandler,
    arrayMessageHandler,
    userInfoHandler,
    dataHasLengthHandler,
    interactedBcastHandler,
    messageInsertedHandler,
    authenticationHandler
}


