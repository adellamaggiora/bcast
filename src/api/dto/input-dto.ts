import { geoFns } from "src/functions/geo-fns";
import { IBcast } from "src/interfaces/bcast";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawListedBcast } from "src/interfaces/raw/raw-listed-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserAuth } from "src/interfaces/raw/raw-user-auth";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { UserAuth } from "src/interfaces/user-auth";
import { IUserInfo } from "src/interfaces/user-info";


const buildBcast = (rawBcast: IRawBcast, image: File): IBcast => {
  const { lat, lng } = geoFns.parseGeoPoint(rawBcast?.location);
  return {
    id: rawBcast?.id,
    userId: rawBcast?.user_id,
    expiresAt: new Date(rawBcast?.expires_at),
    location: { lat: lat, lng: lng },
    maxUsers: rawBcast?.max_users,
    tag: rawBcast?.tag,
    content: rawBcast?.content,
    title: rawBcast?.title,
    createdAt: new Date(rawBcast?.created_at),
    image
  }
};

const buildListedBcast = (rawListedBcast: IRawListedBcast, image: File): IListedBcast => {
  const { lat, lng } = geoFns.parseGeoPoint(rawListedBcast.location);
  return {
    id: rawListedBcast?.id,
    userId: rawListedBcast?.user_id,
    title: rawListedBcast?.title,
    expiresAt: new Date(rawListedBcast?.expires_at),
    distMeters: rawListedBcast?.dist_meters,
    location: { lat, lng },
    maxUsers: rawListedBcast?.max_users,
    joinedUsers: rawListedBcast?.joined_users,
    joined: rawListedBcast?.joined,
    tag: rawListedBcast?.tag,
    image
  }
}

const buildUserInfo = (rawUserInfo: IRawUserInfo): IUserInfo => {
  return {
    bcast: {
      toGet: rawUserInfo.bcast_to_get,
      toSend: rawUserInfo.bcast_to_send,
    }
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

const buildUserAuth = (rawUserInfo: IRawUserAuth): UserAuth => {
  return rawUserInfo;
}


export default {
  buildBcast,
  buildUserInfo,
  buildMessage,
  buildUserAuth,
  buildListedBcast
}