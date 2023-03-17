import { IBcast } from "src/interfaces/bcast";
import { ICandidateBcast } from "src/interfaces/candidate-bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from "./dto/input-dto";

type ApiHandler<T> = (dto: any) => T;

const handleObject = (dto: Function) => ({ data, error }: { data: any, error: any }) => {
    if (error) {
        throw error;
    }
    return dto(data);
}

const handleFirstObject = (dto: Function) => ({ data, error }: { data: any, error: any }) => {
    if (error) {
        throw error;
    }
    return dto(data?.at(0));
}

const handleArray = (dto: Function) => ({ data, error }: { data: any, error: any }) => {
    if (error) {
        throw error;
    }
    return data.map((_: any) => dto(_));
}

const bcastHandler: ApiHandler<IBcast[]> = handleArray(inputDto.buildBcast);
const candidateBcastHandler: ApiHandler<ICandidateBcast[]> = handleArray(inputDto?.buildCandidateBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handleFirstObject(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage> = handleArray(inputDto.buildMessage);
const bcastUserExistsHandler: ApiHandler<boolean> = handleObject(((data: any) => data.length > 0));


export default {
    bcastHandler,
    candidateBcastHandler,
    userInfoHandler,
    messageHandler,
    bcastUserExistsHandler
}


