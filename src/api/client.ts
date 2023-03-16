import { createClient } from "@supabase/supabase-js";
import api from "./api";
import { supabaseKey, supabaseUrl } from "./constants";

const client = createClient(supabaseUrl, supabaseKey);

export default api(client);