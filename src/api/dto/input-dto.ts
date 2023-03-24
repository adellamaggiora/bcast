import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";
import { geoFns } from "../../functions/geo-fns";


const buildBcast = (rawBcast: IRawBcast): IBcast => {
  const { lat, lng } = geoFns.parseGeoPoint(rawBcast.location);
  return {
    id: rawBcast?.id,
    content: {
      title: rawBcast.title,
      message: rawBcast.content,
    },
    expiresAt: new Date(rawBcast.expires_at),
    location: {
      lat: lat,
      lng: lng,
    },
    maxDistanceKm: rawBcast.max_distance_km,
    maxUsers: rawBcast.max_user,
    tag: rawBcast.tag,
    explicitContent: rawBcast.explicit,
    distanceKm: Math.floor(rawBcast?.distance_km) || 0
  }
};

const buildUserInfo = (rawUserInfo: IRawUserInfo): IUserInfo => {
  return {
    bcast: {
      toGet: rawUserInfo.bcast_to_get,
      toSend: rawUserInfo.bcast_to_send,
    },
    tag: rawUserInfo.tag,
  }
};

const buildMessage = (rawMessage: IRawMessage): IMessage => {
  return {
    bcastId: rawMessage.bcast_id,
    content: rawMessage.content,
    userId: rawMessage.user_id,
    createdAt: new Date(rawMessage.created_at),
  }
};


export default {
  buildBcast,
  buildUserInfo,
  buildMessage
}
