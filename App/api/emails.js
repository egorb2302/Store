// let emails = [];

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const { data: newEmail, error } = await supabase
    .from('emails')
    .insert([{
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      sent_at: new Date().toISOString()
    }])
    .select()
    .single()
  
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ success: true, email: newEmail })
}