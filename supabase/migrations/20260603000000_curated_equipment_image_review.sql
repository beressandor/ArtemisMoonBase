update public.equipment
set
  image_url = 'https://www.nasa.gov/wp-content/uploads/2024/04/astrolab-clv-1-03.jpeg',
  source_urls = '[
    { "label": "NASA Moon Base Systems", "url": "https://www.nasa.gov/moonbase-systems/", "confidence": "official" },
    { "label": "NASA Lunar Terrain Vehicle", "url": "https://www.nasa.gov/suits-and-rovers/lunar-terrain-vehicle/", "confidence": "official" },
    { "label": "NASA Astrolab CLV-1 Image", "url": "https://www.nasa.gov/image-detail/powerpoint-presentation-8/", "confidence": "official" }
  ]'::jsonb,
  updated_at = now()
where id = 'astrolab-clv-1';

update public.equipment
set
  image_url = 'https://www.nasa.gov/wp-content/uploads/2024/04/pegasus-3-1.png?w=1024',
  source_urls = '[
    { "label": "NASA Moon Base Systems", "url": "https://www.nasa.gov/moonbase-systems/", "confidence": "official" },
    { "label": "NASA Lunar Terrain Vehicle", "url": "https://www.nasa.gov/suits-and-rovers/lunar-terrain-vehicle/", "confidence": "official" },
    { "label": "NASA Lunar Outpost Pegasus Image", "url": "https://www.nasa.gov/image-detail/pegasus-3-2/", "confidence": "official" }
  ]'::jsonb,
  updated_at = now()
where id = 'lunar-outpost-pegasus';

update public.equipment
set
  image_url = 'https://images-assets.nasa.gov/image/jsc2026e002504/jsc2026e002504~orig.jpg',
  source_urls = '[
    { "label": "NASA Artemis", "url": "https://www.nasa.gov/humans-in-space/artemis/", "confidence": "official" },
    { "label": "NASA Images", "url": "https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf", "confidence": "official" },
    { "label": "NASA AxEMU Spacesuit Image", "url": "https://www.nasa.gov/image-article/axiom-space-tests-lunar-spacesuit-at-nasas-johnson-space-center/", "confidence": "official" }
  ]'::jsonb,
  updated_at = now()
where id = 'xemu-suits';
