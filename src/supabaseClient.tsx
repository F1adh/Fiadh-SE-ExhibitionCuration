import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://kvujsisazojpnqrqkoou.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_KEY environment variable')
}

const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase
