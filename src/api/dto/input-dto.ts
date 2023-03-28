import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IRawUserSession } from "src/interfaces/raw/raw-user-session";
import { IUserInfo } from "src/interfaces/user-info";
import { IUserSession } from "src/interfaces/user-session";
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

const buildUserSession = (rawUserSession: IRawUserSession): IUserSession => {
  return {
    id: rawUserSession?.user?.id,
    email: rawUserSession?.user?.email,
    lastSignIn: rawUserSession.user.last_sign_in_at? new Date(rawUserSession.user.last_sign_in_at) : null, 
    jwt: {
      accessToken: rawUserSession?.access_token,
      refreshToken: rawUserSession?.refresh_token,
      expiresIn: rawUserSession?.expires_in,
      expriesAt: rawUserSession.expires_at
    }

  }
}


export default {
  buildBcast,
  buildUserInfo,
  buildMessage,
  buildUserSession
}
