import { Session, SupabaseClient } from "@supabase/supabase-js";
import { IBcast } from "src/interfaces/bcast";
import { IGeoLocation } from "src/interfaces/geo-location";
import { IMessage } from "src/interfaces/message";
import { ISignIn } from "src/interfaces/sign-in";
import outputDto from "./dto/output-dto";
import handlers from "./utils/handlers";
import { apiUtils } from "./utils/api-utils";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { IRawBcastFilters } from "src/interfaces/raw/raw-filters/raw-bcast-filters";

const api =
  (init = false) => (supabase: SupabaseClient<any, "public", any>) => {
    if (init) {
      throw new Error("Supabase client alredy initialized");
    }
    init = true;

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("New auth event", event, "Session:", session);
    });

    return {
      supabase,

      bcast: {
        insert: async (userId: string, bcast: Partial<IBcast>) => {
          const rawBcast = outputDto.buildRawBcast(userId, bcast);
          const insertedBcastId: string = await supabase
            .from("bcast")
            .insert(rawBcast)
            .select()
            .then(handlers.insertedBcastHandler);
          if (bcast?.image) {
            await apiUtils.insertBcastImage(
              supabase,
              insertedBcastId,
              bcast.image,
            );
          }
          return insertedBcastId;
        },

        getDetail: (
          userId: string,
          bcastId: string,
          location: IGeoLocation,
        ) =>
          supabase
            .rpc("bcast_detail", {
              p_user_id: userId,
              p_bcast_id: bcastId,
              p_lng: location.lng,
              p_lat: location.lat,
            })
            .then(handlers.bcastDetailHandler(supabase)),

        getList: (
          userId: string,
          location: IGeoLocation,
          filters: IBcastFilters,
          limit = 50,
          offset = 0,
        ) => {
          const rawFilters: IRawBcastFilters = outputDto.filtersToRawFilters(filters);
          const { maxDistanceMeters = null, tag = null, availability = null, author = null, partecipation = null } = rawFilters || {};
          return supabase
            .rpc("bcast_list", {
              p_user_id: userId,
              p_lng: location.lng,
              p_lat: location.lat,
              p_max_dist_meters: maxDistanceMeters,
              p_tag: tag,
              p_availability: availability,
              p_author: author,
              p_partecipation: partecipation,
            })
            .range(offset, (offset + limit))
            .then(handlers.bcastListHandler(supabase))
        },

        join: async (userId: string, bcastId: string) => {
          const bcastUserExists = await apiUtils.bcastUserRecordExists(
            supabase,
            userId,
            bcastId,
          );
          if (bcastUserExists) {
            return supabase
              .from("bcast_user")
              .update({ joined: true })
              .eq("user_id", userId)
              .eq("bcast_id", bcastId);
          } else {
            return supabase
              .from("bcast_user")
              .insert({ user_id: userId, bcast_id: bcastId, joined: true });
          }
        },
      },

      message: {
        getAll: (bcastId: string, limit = 50, offset = 0) =>
          supabase
            .from("message")
            .select("*")
            .eq("bcast_id", bcastId)
            .range(offset, offset + limit)
            .then(handlers.messageListHandler),

        insert: (userId: string, bcastId: string, content: string) =>
          supabase
            .from("message")
            .insert([
              { content, user_id: userId, bcast_id: bcastId },
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
              (data) => {
                const message = handlers.messageInsertedHandler(data);
                cb(message);
              },
            )
            .subscribe(),
      },

      userInfo: {
        get: (userId: string) =>
          supabase
            .from("user_info")
            .select("*")
            .eq("id", userId)
            .then(handlers.userInfoHandler),

        getUsername: (userId: string) =>
          supabase
            .from("user_info")
            .select("username")
            .eq('id', userId)
            .then(handlers.getUsernameHandler),

        setUsername: (userId: string, username: string) =>
          supabase
            .from("user_info")
            .upsert({ id: userId, username: username })
            .eq("id", userId)
            .then(handlers.setUsernameHandler)
      },

      auth: {
        signInWithGoogle: () =>
          supabase
            .auth
            .signInWithOAuth({
              provider: "google",
              options: {
                queryParams: {
                  access_type: "offline",
                  prompt: "consent",
                },
              },
            }),

        signIn: (signIn: ISignIn) =>
          supabase
            .auth
            .signInWithPassword(signIn)
            .then(handlers.authHandler),

        signUp: (signUp: ISignIn) =>
          supabase
            .auth.signUp(signUp)
            .then(handlers.authHandler),

        signOut: () =>
          supabase
            .auth
            .signOut()
            .then(handlers.signoutHandler),

        refreshSession: () =>
          supabase
            .auth
            .refreshSession()
            .then(handlers.authHandler),

        setSession: (session: Session | null) =>
          supabase
            .auth
            .setSession(session)
            .then(handlers.authHandler),

        getSession: () =>
          supabase
            .auth
            .getSession()
            .then(handlers.authHandler),

        initilaizeSession: () =>
          supabase
            .auth
            .initialize(),
      },
    };
  };

export default api();
