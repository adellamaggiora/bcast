import { createClient } from "@supabase/supabase-js";
import api from "./api";
import { supabaseAnonKey, supabaseUrl } from "./constants";

const client = createClient(supabaseUrl, supabaseAnonKey);

export default api(client);