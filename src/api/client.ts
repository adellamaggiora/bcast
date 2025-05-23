import { createClient } from "@supabase/supabase-js";
import api from "./api";
import { supabaseAnonKey, supabaseUrl } from "./constants";

console.log('supabaseUrl', supabaseUrl)
console.log('supabaseAnonKey', supabaseAnonKey)
const client = createClient(supabaseUrl, supabaseAnonKey);

export default api(client);