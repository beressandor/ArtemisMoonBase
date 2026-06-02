update public.missions
set
  hero_image_url = case id
    when 'artemis-ii' then 'https://images-assets.nasa.gov/image/NHQ202211160008/NHQ202211160008~large.jpg'
    when 'artemis-iii' then 'https://www.nasa.gov/wp-content/uploads/2023/04/51476988575-254f09eb06-o.jpg?w=1536'
    when 'starship-hls-demo' then 'https://www.nasa.gov/wp-content/uploads/2024/11/11-03-24-artemis-3-on-surface.jpg?w=1024'
    when 'gateway-ppe-halo' then 'https://www.nasa.gov/wp-content/uploads/2023/06/artemis-gateway-artemis-iv-gateway-landscapeorig.png?w=2048'
    when 'artemis-iv' then 'https://www.nasa.gov/wp-content/uploads/2023/06/artemis-gateway-artemis-iv-gateway-landscapeorig.png?w=2048'
    when 'artemis-v' then 'https://www.nasa.gov/wp-content/uploads/2023/05/bluemoon-nasa-option-2023-05-19-01.29.31-0.jpg?w=985'
    else hero_image_url
  end,
  updated_at = now()
where id in (
  'artemis-ii',
  'artemis-iii',
  'starship-hls-demo',
  'gateway-ppe-halo',
  'artemis-iv',
  'artemis-v'
);
