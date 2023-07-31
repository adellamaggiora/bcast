import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";


const buildRawUserInfo = (userId: string, userInfo: Partial<IUserInfo> ): IRawUserInfo => ({
    id: userId,
    bcast_to_get: userInfo?.bcast?.toGet || 0,
    bcast_to_send: userInfo?.bcast?.toSend || 0
});

const buildRawBcast = (userId: string, bcast: Partial<IBcast>): Partial<IRawBcast> => ({
    user_id: userId,
    expires_at: bcast.expiresAt,
    max_users: bcast.maxUsers,
    tag: bcast.tag,
    title: bcast.title,
    content: bcast.content,
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