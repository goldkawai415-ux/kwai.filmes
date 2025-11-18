import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ueeyjrkxktndkywquenh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZXlqcmt4a3RuZGt5d3F1ZW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDExODcsImV4cCI6MjA3OTAxNzE4N30.FxNjPFC4bIr49U_ydd5nD_6U6jPv4MeL514iT-qZrNw"
);
