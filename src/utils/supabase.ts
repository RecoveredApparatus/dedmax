import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrmfltxjhktrqanvkgzz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybWZsdHhqaGt0cnFhbnZrZ3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDI1MjYsImV4cCI6MjA0OTQ3ODUyNn0.aCTLMd-Q2GhaGgSGgz909rGDHVvjOmR3TO5fEWHYJj0';

export const supabase = createClient(supabaseUrl, supabaseKey);