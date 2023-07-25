import { SupabaseClient } from "@supabase/supabase-js"
import handlers from "./handlers"

const BCAST_BUCKET = 'public/bcast';

const getBcastImageBlob = (supabase: SupabaseClient<any, "public", any>, bcastId: string, imageName: string) => supabase
    .storage
    .from(BCAST_BUCKET)
    .download(`${bcastId}/${imageName}`)

const bcastUserRecordExists = (supabase: SupabaseClient<any, "public", any>, userId: string, bcastId: string) => supabase.from("bcast_user")
    .select('*')
    .eq("user_id", userId)
    .eq("bcast_id", bcastId)
    .then(handlers.dataHasLengthHandler)

const insertBcastImage = (supabase: SupabaseClient<any, "public", any>, image: File) => supabase
    .storage
    .from(BCAST_BUCKET)
    .upload(image.name, image, {
        cacheControl: '3600',
        upsert: false
    })

export const apiUtils = {
    getBcastImageBlob,
    bcastUserRecordExists,
    insertBcastImage
}