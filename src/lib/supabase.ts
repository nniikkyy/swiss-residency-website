import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nvzcqgwxisuqeymnopvn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52emNxZ3d4aXN1cWV5bW5vcHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjM4OTUsImV4cCI6MjA4NzU5OTg5NX0.Xv-UvTpPypkUL0yVvvqGQsBewQ_rMq2g9qAyE04Dm6U"

export const supabase = createClient(supabaseUrl, supabaseKey)