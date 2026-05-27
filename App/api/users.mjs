// let users = [
//   {
//     "id": "1",
//     "email": "user@example.com",
//     "password": "123",
//     "name": "John Doe"
//   },
//   {
//     "name": "Pidaras Ebani",
//     "email": "berendeevegor@gmail.com",
//     "password": "321321",
//     "confirmPass": "321321",
//     "id": "5jg-klxH5HE"
//   },
//   {
//     "name": "ЕгорЕгор",
//     "email": "berendeevegor1111@gmail.com",
//     "password": "123123",
//     "confirmPass": "123123",
//     "id": "coJV02ZrTtg"
//   }
// ];

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { method } = req;
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.searchParams.get('id') || url.pathname.split('/').pop();

  switch (method) {
    case 'GET':
      if (id && id !== 'users') {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) return res.status(404).json({ error: error.message })
        const { confirmPass, ...userData } = data
        return res.status(200).json(userData)
      }
      
      const { data: allUsers, error: getAllError } = await supabase
        .from('users')
        .select('*')
      
      if (getAllError) return res.status(500).json({ error: getAllError.message })
      return res.status(200).json(allUsers)

    case 'POST':
      const newUser = {
        id: req.body.id || Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      
      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()
      
      if (createError) return res.status(500).json({ error: createError.message })
      return res.status(201).json(createdUser)

    case 'DELETE':
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      
      if (deleteError) return res.status(500).json({ error: deleteError.message })
      return res.status(200).json({ success: true })

    case 'PATCH':
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update(req.body)
        .eq('id', id)
        .select()
        .single()
      
      if (updateError) return res.status(500).json({ error: updateError.message })
      return res.status(200).json(updatedUser)

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PATCH']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}