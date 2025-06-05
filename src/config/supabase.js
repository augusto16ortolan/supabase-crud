import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mrlvisvcqlytkssxblpr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybHZpc3ZjcWx5dGtzc3hibHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTM3NDMsImV4cCI6MjA2NDU2OTc0M30.Fd-pmUCDPoPFpfnpqHnLjna-vFu05RHXKl5gF3xKma0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
