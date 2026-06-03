update public.missions
set
  status = 'completed',
  starts_at = '2026-04-01T22:35:00Z',
  date_label = '2026.04.01',
  date_precision = 'exact',
  summary = 'The first crewed Artemis flight test sent astronauts around the Moon and back aboard Orion, completing splashdown on April 10, 2026.',
  objectives = '[
    "Validated Orion life support",
    "Demonstrated crew operations",
    "Returned safely after lunar flyby"
  ]'::jsonb,
  hero_image_url = 'https://images-assets.nasa.gov/image/SLS_MAF_20260401_Artemis%20II%20Launch-293/SLS_MAF_20260401_Artemis%20II%20Launch-293~large.jpg',
  source_urls = '[
    {
      "label": "NASA Artemis II",
      "url": "https://www.nasa.gov/mission/artemis-ii/",
      "confidence": "official"
    },
    {
      "label": "NASA Artemis II Launch",
      "url": "https://www.nasa.gov/gallery/artemis-ii-launch/",
      "confidence": "official"
    },
    {
      "label": "NASA Artemis II Return",
      "url": "https://www.nasa.gov/news-release/nasa-welcomes-record-setting-artemis-ii-moonfarers-back-to-earth/",
      "confidence": "official"
    }
  ]'::jsonb,
  updated_at = now()
where id = 'artemis-ii';

update public.mission_events
set
  title = 'Artemis II launch',
  starts_at = '2026-04-01T22:35:00Z',
  date_label = '2026.04.01',
  date_precision = 'exact',
  status = 'completed',
  summary = 'NASA''s SLS rocket launched Orion and the Artemis II crew from Launch Complex 39B on April 1, 2026.',
  source_urls = '[
    {
      "label": "NASA Artemis II Launch",
      "url": "https://www.nasa.gov/gallery/artemis-ii-launch/",
      "confidence": "official"
    },
    {
      "label": "NASA Artemis II Return",
      "url": "https://www.nasa.gov/news-release/nasa-welcomes-record-setting-artemis-ii-moonfarers-back-to-earth/",
      "confidence": "official"
    }
  ]'::jsonb,
  last_synced_at = now(),
  updated_at = now()
where mission_id = 'artemis-ii';
