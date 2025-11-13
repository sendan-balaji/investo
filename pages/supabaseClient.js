// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Get your Supabase URL and Anon Key from your project's API settings
const supabaseUrl = 'https://ecjfgqovuzbuswxmhezm.supabase.com';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjamZncW92dXpidXN3eG1oZXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTUyNTAsImV4cCI6MjA3NzU5MTI1MH0.APr6QaiHNkDL-XFD_rWPT09NqrLI2HrqruGqXLYXQCk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
