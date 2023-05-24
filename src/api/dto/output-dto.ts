import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";

const buildRawUserInfo = (userId: string, userInfo: Partial<IUserInfo> ): IRawUserInfo => ({
    id: userId,
    bcast_to_get: userInfo.bcast?.toGet,
    bcast_to_send: userInfo.bcast?.toSend,
    tag: userInfo?.tag,
});

const buildRawBcast = (userId: string, bcast: IBcast): Partial<IRawBcast> => ({
    user_id: userId,
    expires_at: bcast.expiresAt,
    max_user: bcast.maxUsers,
    tag: bcast.tag,
    title: bcast.content.title,
    content: bcast.content.message,
    location: `POINT(${bcast.location.lng} ${bcast.location.lat})`
});

const buildRawMessage = (userId: string, bcastId: string, message: IMessage): Partial<IRawMessage> => ({
    user_id: userId,
    bcast_id: bcastId,
    content: message.content
})


export default {
    buildRawUserInfo,
    buildRawBcast,
    buildRawMessage
}