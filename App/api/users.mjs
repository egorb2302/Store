import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { method } = req;
  
  // Извлекаем id из URL: /api/users/123 → id = 123
  const urlParts = req.url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  const isSingleUser = lastPart !== 'users' && lastPart.length > 0;

  switch (method) {
    case 'GET':
      if (isSingleUser) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', lastPart)
          .single()
        
        if (error) return res.status(404).json({ error: error.message })
        return res.status(200).json(data)
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
      if (!isSingleUser) return res.status(400).json({ error: 'User ID is required' })
      
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', lastPart)
      
      if (deleteError) return res.status(500).json({ error: deleteError.message })
      return res.status(200).json({ success: true })

    case 'PATCH':
      if (!isSingleUser) return res.status(400).json({ error: 'User ID is required' })
      
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update(req.body)
        .eq('id', lastPart)
        .select()
        .single()
      
      if (updateError) return res.status(500).json({ error: updateError.message })
      return res.status(200).json(updatedUser)

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PATCH']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}