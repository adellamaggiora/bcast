import { SupabaseClient } from "@supabase/supabase-js"
import handlers from "./handlers"

export const BCAST_MAIN_IMAGE_NAME = 'main';

const getBcastImageBlob = (supabase: SupabaseClient<any, "public", any>, bcastId: string, imageName: string) => supabase
    .storage
    .from('public/bcast')
    .download(`${bcastId}/${imageName}`)

const bcastUserRecordExists = (supabase: SupabaseClient<any, "public", any>, userId: string, bcastId: string) => supabase.from("bcast_user")
    .select('*')
    .eq("user_id", userId)
    .eq("bcast_id", bcastId)
    .then(handlers.dataHasLengthHandler)

const insertBcastImage = (supabase: SupabaseClient<any, "public", any>, bcastId: string, image: File) => supabase
    .storage
    .from('bcast')
    .upload(`${bcastId}/${image.name}`, image, {
        cacheControl: '3600',
        upsert: false
    })

export const apiUtils = {
    getBcastImageBlob,
    bcastUserRecordExists,
    insertBcastImage
}