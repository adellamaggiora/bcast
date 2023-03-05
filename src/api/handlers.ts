import inputDto from "../functions/dto/input-dto";
import { IBcast } from "../interfaces/bcast";
import { IMessage } from "../interfaces/message";
import { IUserInfo } from "../interfaces/user-info";

type ApiHandler<T> = (dto) => ({data, error}) => T;

const handler = (dto: Function) => ({data, error}: {data: any, error: any}) => {
    if (error) {
        throw error
    }
    return dto(data);
}

const bcastHandler: ApiHandler<IBcast> = handler(inputDto.rawBcastToBcast);
const userInfoHandler: ApiHandler<IUserInfo> = handler(inputDto.rawUserInfoToUserInfo);
const messageHandler: ApiHandler<IMessage> = handler(inputDto.rawMessageToMessage);


export default {
  bcastHandler,
  userInfoHandler,
  messageHandler
}


