import { SupabaseClient } from "@supabase/supabase-js"
import handlers from "./handlers"

const BCAST_BUCKET = 'public/bcast';

const getBcastImageBlob = (supabase: SupabaseClient<any, "public", any>, imageName: string) => supabase
    .storage
    .from(BCAST_BUCKET)
    .download(imageName)

const bcastUserRecordExists = (supabase: SupabaseClient<any, "public", any>, userId: string, bcastId: string) => supabase.from("bcast_user")
    .select('*')
    .eq("user_id", userId)
    .eq("bcast_id", bcastId)
    .then(handlers.dataHasLengthHandler)

export const apiUtils = {
    getBcastImageBlob,
    bcastUserRecordExists
}