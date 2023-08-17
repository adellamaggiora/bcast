import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from "../dto/input-dto";
import {
  AuthError,
  AuthResponse,
  PostgrestSingleResponse,
  RealtimePostgresInsertPayload,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawListedBcast } from "src/interfaces/raw/raw-listed-bcast";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { apiUtils } from "./api-utils";
import { BCAST_MAIN_IMAGE_NAME } from "src/constants";
import { IBcastDetail } from "src/interfaces/bcast-detail";
import { IRawBcastDetail } from "src/interfaces/raw/raw-bcast-detail";

const _errorHandler = (response: any) => {
  if (response?.error || response?.errors) {
    throw response?.error?.message || response.errors || `Generic API error`;
  }
};

const messageListHandler = (
  response: PostgrestSingleResponse<IRawMessage[]>,
): IMessage[] => {
  _errorHandler(response);
  const messageList: IMessage[] = response?.data?.map(inputDto.buildMessage);
  return messageList;
};

const messageInsertedHandler = (
  response: RealtimePostgresInsertPayload<{ [key: string]: any }>,
): IMessage => {
  _errorHandler(response);
  const rawMessage = response?.new as IRawMessage;
  const message: IMessage = inputDto.buildMessage(rawMessage);
  return message;
};

const bcastListHandler =
  (supabase: SupabaseClient<any, "public", any>) =>
  async (
    response: PostgrestSingleResponse<IRawListedBcast[]>,
  ): Promise<IListedBcast[]> => {
    _errorHandler(response);
    const rawListedBcast: IRawListedBcast[] = response.data;
    const imagePromises = rawListedBcast?.map(async (rawBcast) => {
      const listResponse = await supabase
        .storage
        .from("bcast")
        .list(rawBcast.id);

      _errorHandler(listResponse);

      let image: File;

      if (listResponse?.data?.length) {
        const mainImage = listResponse?.data?.find((_) =>
          _.name?.includes(BCAST_MAIN_IMAGE_NAME)
        );
        if (mainImage) {
          const blob = await apiUtils.getBcastImageBlob(
            supabase,
            rawBcast.id,
            mainImage.name,
          );
          image = new File([blob], mainImage.name);
        }
      }

      const listedBcast: IListedBcast = inputDto.buildListedBcast(
        rawBcast,
        image,
      );
      return listedBcast;
    });

    return Promise.all(imagePromises);
  };

const bcastDetailHandler =
  (supabase: SupabaseClient<any, "public", any>) =>
  async (response: PostgrestSingleResponse<any>): Promise<IBcastDetail> => {
    _errorHandler(response);
    const rawBcastDetail: IRawBcastDetail = response.data.at(0);
    const listResponse = await supabase
      .storage
      .from("bcast")
      .list(rawBcastDetail.id);

    _errorHandler(listResponse);

    let image: File;

    if (listResponse?.data?.length) {
      const mainImage = listResponse?.data?.find((_) =>
        _.name?.includes("main")
      );
      if (mainImage) {
        const blob = await apiUtils.getBcastImageBlob(
          supabase,
          rawBcastDetail.id,
          mainImage.name,
        );
        image = new File([blob], mainImage.name);
      }
    }

    const bcastDetail: IBcastDetail = inputDto.buildBcastDetail(
      response?.data?.at(0),
      image,
    );
    return bcastDetail;
  };

const userInfoHandler = (
  response: PostgrestSingleResponse<IRawUserInfo[]>,
): IUserInfo => {
  _errorHandler(response);
  const data = response?.data?.at(0) as IRawUserInfo;
  const userInfo: IUserInfo = inputDto.buildUserInfo(data);
  return userInfo;
};

const authHandler = (response: AuthResponse): Session => {
  _errorHandler(response);
  const session: Session = response.data.session;
  return session;
};

const dataHasLengthHandler = (response: PostgrestSingleResponse<any>) => {
  _errorHandler(response);
  const dataHasLength: boolean = response?.data?.length > 0;
  return dataHasLength;
};

const insertedBcastHandler = (response: PostgrestSingleResponse<any[]>) => {
  _errorHandler(response);
  const id: string = response.data.at(0).id;
  return id;
};

const insertedImageHandler = (
  response: { data: { path: string }; error: any },
) => {
  _errorHandler(response);
  return response.data.path;
};

const bcastBlobHandler = (response: { data: Blob; error: any }) => {
  _errorHandler(response);
  return response.data;
};

const signoutHandler = (response: { error: AuthError }) => {
  _errorHandler(response);
};

const usernameHandler = (response: PostgrestSingleResponse<{ username: string }[]>) => {
  _errorHandler(response);
  const username = response.data?.at(0)?.username || 'Unkown username';
  return username
}

export default {
  messageListHandler,
  messageInsertedHandler,
  bcastListHandler,
  bcastDetailHandler,
  userInfoHandler,
  authHandler,
  dataHasLengthHandler,
  insertedBcastHandler,
  insertedImageHandler,
  bcastBlobHandler,
  signoutHandler,
  usernameHandler
};
