import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data } = await supabase
    .from('views')
    .select('count')
    .eq('id', 'profile')
    .single();

  const currentCount = data?.count || 0;

  if (!req.cookies?.visited) {
    await supabase
      .from('views')
      .upsert({ id: 'profile', count: currentCount + 1 });

    res.setHeader('Set-Cookie', 'visited=true; Max-Age=86400; Path=/');
  }

  res.status(200).json({ views: currentCount + 1 });
}
