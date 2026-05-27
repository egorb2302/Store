import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const { method } = req;
  
  // Извлекаем id из URL: /api/products/123 → id = 123
  const urlParts = req.url.split('/');
  const id = urlParts[urlParts.length - 1];
  const isSingleProduct = id !== 'products' && !isNaN(Number(id));

  switch (method) {
    case 'GET':
      if (isSingleProduct) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', Number(id))
          .single()
        
        if (error) return res.status(404).json({ error: error.message })
        return res.status(200).json(data)
      }
      
      const { data: allProducts, error: getAllError } = await supabase
        .from('products')
        .select('*')
      
      if (getAllError) return res.status(500).json({ error: getAllError.message })
      return res.status(200).json(allProducts)

    case 'DELETE':
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', Number(id))
      
      if (deleteError) return res.status(500).json({ error: deleteError.message })
      return res.status(200).json({ success: true })

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}