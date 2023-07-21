import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { utilsFns } from "src/functions/utils-fns";
import { IBcast } from "src/interfaces/bcast";
import { IGeoLocation } from "src/interfaces/geo-location";
import { IMessage } from "src/interfaces/message";
import { ISignIn } from "src/interfaces/sign-in";
import { IUserInfo } from "src/interfaces/user-info";
import { v4 as uuid } from "uuid";
import outputDto from "./dto/output-dto";
import handlers from "./utils/handlers";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";

const BCAST_BUCKET = 'public/bcast';

const getBcastImageBlob = (supabase: SupabaseClient<any, "public", any>, imageName: string) => supabase
  .storage
  .from(BCAST_BUCKET)
  .download(imageName)


const bcastUserRecordExists = (supabase: SupabaseClient<any, "public", any>, userId: string, bcastId: string) => {
  return supabase.from("bcast_user")
    .select('*')
    .eq("user_id", userId)
    .eq("bcast_id", bcastId)
    .then(handlers.dataHasLengthHandler)
}

const api = (init = false) => (supabase: SupabaseClient<any, "public", any>) => {
  if (init) {
    throw new Error("Supabase client alredy initialized")
  }
  init = true;

  return {

    supabase,

    bcast: {
      insert: (userId: string, bcast: IBcast) => {
        const rawBcast = outputDto.buildRawBcast(userId, bcast)
        return supabase
          .from("bcast")
          .insert(rawBcast);
      },

      get: (id: string) => supabase
        .from("bcast")
        .select('*')
        .eq("id", id)
        .then(async (response: PostgrestSingleResponse<any[]>) => {
          let imageBlob: Blob | undefined;
          const rawBcast: IRawBcast = response.data.at(0);
          if (rawBcast?.image_name) {
            imageBlob = await getBcastImageBlob(supabase, rawBcast.image_name)?.then(_ => _.data);
          }
          return { response, imageBlob }
        })
        .then(({ response, imageBlob }) => handlers.bcastHandler(response, imageBlob)),

      getList: (userId: string, location: IGeoLocation, maxDistanceMeters: number, limit = 50, offset = 0) => supabase
        .rpc("nearby_bcast", {
          p_user_id: userId,
          p_lng: location.lng,
          p_lat: location.lat,
          p_max_dist_meters: maxDistanceMeters
        })
        .range(offset, (offset + limit))
        // .then(utilsFns.logger(`Bcast list`))
        .then(handlers.bcastListHandler),

      join: async (userId: string, bcastId: string) => {
        const bcastUserExists = await bcastUserRecordExists(supabase, userId, bcastId)
        if (bcastUserExists) {
          return supabase
            .from("bcast_user")
            .update({ joined: true })
            .eq("user_id", userId)
            .eq("bcast_id", bcastId)
        } else {
          return supabase
            .from("bcast_user")
            .insert({ user_id: userId, bcast_id: bcastId, joined: true })
        }
      }
    },

    message: {
      get: (bcastId: string, limit = 50, offset = 0) =>
        supabase
          .from("message")
          .select("*")
          .eq("bcast_id", bcastId)
          .range(offset, (offset + limit))
          .then(_ => {
            console.log(`@todo IMPORTANT::check if metadata from pagination is present`)
            console.log(_)
            return _;
          })
          .then(handlers.messageListHandler),

      insert: (userId: string, bcastId: string, content: string) =>
        supabase
          .from("message")
          .insert([
            { content, user_id: userId, bcast_id: bcastId }
          ]),

      onInsert: (bcastId: string, cb: (payload: IMessage) => void, channelId = uuid()) =>
        supabase
          .channel(channelId)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "message",
              filter: `bcast_id=eq.${bcastId}`,
            },
            data => {
              const message = handlers.messageInsertedHandler(data);
              console.log(message)
              cb(message)
            }
          )
          .subscribe()
    },

    userInfo: {
      get: (userId: string) =>
        supabase
          .from("user_info")
          .select("*")
          .eq("id", userId)
          .then(handlers.userInfoHandler),

      insert: (userId: string, userInfo: IUserInfo) => {
        const rawUserInfo = outputDto.buildRawUserInfo(userId, userInfo)
        return supabase
          .from("user_info")
          .insert(rawUserInfo)
      },

      update: (userId: string, userInfo: Partial<IUserInfo>) => {
        const rawUserInfo = outputDto.buildRawUserInfo(userId, userInfo);
        const obj = utilsFns.removeUndefinedOrNullProps(rawUserInfo);
        return supabase
          .from("user_info")
          .update(obj)
          .eq('id', userId)
      },
    },

    auth: {
      signIn: (signIn: ISignIn) =>
        supabase
          .auth
          .signInWithPassword(signIn)
          .then(handlers.authHandler),

      signUp: (signUp: ISignIn) =>
        supabase
          .auth.signUp(signUp)
          .then(handlers.authHandler),
    }

  }

};

export default api();
