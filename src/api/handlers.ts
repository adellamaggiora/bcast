import { IBcast } from "src/interfaces/bcast";
import { ICandidateBcast } from "src/interfaces/candidate-bcast";
import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from "./dto/input-dto";

type ApiHandler<T> = (dto: any) => T;

const handlerObject = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw error;
    }
    return dto(data?.at(0));
}

const handlerArray = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw error;
    }
    return data.map((_:any) => dto(_));
}

const bcastHandler: ApiHandler<IBcast[]> = handlerArray(inputDto.buildBcast);
const candidateBcastHandler: ApiHandler<ICandidateBcast[]> = handlerArray(inputDto?.buildBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handlerObject(inputDto.buildUserInfo);
const messageHandler: ApiHandler<IMessage> = handlerArray(inputDto.buildMessage);


export default {
  bcastHandler,
  candidateBcastHandler,
  userInfoHandler,
  messageHandler
}


