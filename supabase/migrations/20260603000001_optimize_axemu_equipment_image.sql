update public.equipment
set
  image_url = 'https://images-assets.nasa.gov/image/jsc2026e002504/jsc2026e002504~large.jpg',
  updated_at = now()
where id = 'xemu-suits';
