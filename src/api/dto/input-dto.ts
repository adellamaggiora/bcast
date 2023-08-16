import { geoFns } from "src/functions/geo-fns";
import { IBcastDetail } from "src/interfaces/bcast-detail";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcastDetail } from "src/interfaces/raw/raw-bcast-detail";
import { IRawListedBcast } from "src/interfaces/raw/raw-listed-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";


const buildBcastDetail = (rawBcastDetail: IRawBcastDetail, image: File): IBcastDetail => {
  const { lat, lng } = geoFns.parseGeoPoint(rawBcastDetail?.location);
  return {
    id: rawBcastDetail?.id,
    userId: rawBcastDetail?.user_id,
    expiresAt: new Date(rawBcastDetail?.expires_at),
    location: { lat: lat, lng: lng },
    maxUsers: rawBcastDetail?.max_users,
    tag: rawBcastDetail?.tag,
    content: rawBcastDetail?.content,
    title: rawBcastDetail?.title,
    createdAt: new Date(rawBcastDetail?.created_at),
    hidePosition: rawBcastDetail?.hide_position,
    distMeters: rawBcastDetail?.dist_meters,
    joined: rawBcastDetail?.joined,
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
      toGet: rawUserInfo?.bcast_to_get,
      toSend: rawUserInfo?.bcast_to_send,
    }
  }
};

const buildMessage = (rawMessage: IRawMessage): IMessage => {
  return {
    bcastId: rawMessage?.bcast_id,
    content: rawMessage?.content,
    userId: rawMessage?.user_id,
    createdAt: new Date(rawMessage?.created_at),
  }
};

export default {
  buildBcastDetail,
  buildUserInfo,
  buildMessage,
  buildListedBcast
}