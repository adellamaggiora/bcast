import { SupabaseClient } from "@supabase/supabase-js";
import { utilsFns } from "src/functions/utils-fns";
import { IBcast } from "src/interfaces/bcast";
import { IGeoLocation } from "src/interfaces/geo-location";
import { IMessage } from "src/interfaces/message";
import { ISignIn } from "src/interfaces/sign-in";
import { IUserInfo } from "src/interfaces/user-info";
import outputDto from "./dto/output-dto";
import handlers from "./utils/handlers";
import { apiUtils } from "./utils/api-utils";


const api = (init = false) => (supabase: SupabaseClient<any, "public", any>) => {
  if (init) {
    throw new Error("Supabase client alredy initialized")
  }
  init = true;

  return {

    supabase,

    bcast: {
      insert: async (userId: string, bcast: Partial<IBcast>) => {
        const rawBcast = outputDto.buildRawBcast(userId, bcast);
        const insertedBcastId: string = await supabase
          .from("bcast")
          .insert(rawBcast)
          .select()
          .then(handlers.insertedBcastHandler)
        if (bcast?.image) {
          await apiUtils.insertBcastImage(supabase, insertedBcastId, bcast.image);
        }
        return insertedBcastId;
      },

      get: (id: string) => supabase
        .from("bcast")
        .select('*')
        .eq("id", id)
        .then(handlers.bcastHandler(supabase)),

      getList: (
        userId: string, 
        location: IGeoLocation, 
        maxDistanceMeters: number | null = null,
        tag: string[] | null = null,
        availability: 'vacant' | 'soldOut' | null = null,
        author: 'me' | 'others' | null = null,
        partecipation: 'partecipating' | 'notPartecipating' | null = null,
        limit = 50, 
        offset = 0
        ) => supabase
        .rpc("bcast_list", {
          p_user_id: userId,
          p_lng: location.lng,
          p_lat: location.lat,
          p_max_dist_meters: maxDistanceMeters,
          p_tag: tag,
          p_availability: availability,
          p_author: author,
          p_partecipation: partecipation
        })
        //.range(offset, (offset + limit))
        // .then(utilsFns.logger(`Bcast list`))
        .then(handlers.bcastListHandler(supabase)),

      join: async (userId: string, bcastId: string) => {
        const bcastUserExists = await apiUtils.bcastUserRecordExists(supabase, userId, bcastId)
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

      onInsert: (bcastId: string, cb: (payload: IMessage) => void) =>
        supabase
          .channel(bcastId)
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
      }
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
      
      refresh: () => 
        supabase
          .auth
          .refreshSession()
          .then(handlers.authHandler),

      signInWithGoogle: () => 
        supabase
        .auth
        .signInWithOAuth({
          provider: "google",
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            }
          }
        })
    }

  }

};

export default api();
