import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";

const rawBcastToBcast = (rawBcast: IRawBcast): IBcast => ({
  content: {
    title: rawBcast.title,
    message: rawBcast.content,
  },
  expiresAt: new Date(rawBcast.expires_at),
  location: {
    lat: +rawBcast.location,
    lng: +rawBcast.location,
  },
  maxDistanceKm: rawBcast.max_distance_km,
  maxUsers: rawBcast.max_user,
  tag: rawBcast.tag,
  explicitContent: rawBcast.explicit,
});

const rawUserInfoToUserInfo = (rawUserInfo: IRawUserInfo): IUserInfo => ({
  bcast: {
    toGet: rawUserInfo.bcast_to_get,
    toSend: rawUserInfo.bcast_to_send,
  },
  tag: rawUserInfo.tag,
});

const rawMessageToMessage = (rawMessage: IRawMessage): IMessage => ({
  bcastId: rawMessage.bcast_id,
  content: rawMessage.content,
  userId: rawMessage.user_id,
  createdAt: new Date(rawMessage.created_at),
});



export default {
    rawBcastToBcast,
    rawUserInfoToUserInfo,
    rawMessageToMessage
}