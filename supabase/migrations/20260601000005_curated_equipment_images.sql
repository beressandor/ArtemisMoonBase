update public.equipment
set
  image_url = case id
    when 'sls' then 'https://www.nasa.gov/wp-content/uploads/2023/02/Artemis-I-launch.jpg'
    when 'orion' then 'https://images-assets.nasa.gov/image/art001e000672/art001e000672~orig.jpg'
    when 'starship-hls' then 'https://www.nasa.gov/wp-content/uploads/2023/01/spacex_starship_hls_artemis_iii_2_crew_0_0.jpg'
    when 'blue-moon' then 'https://www.nasa.gov/wp-content/uploads/2026/05/blue-origin-mk-1.jpg?w=1950'
    when 'nova-c' then 'https://www.nasa.gov/wp-content/uploads/2026/05/intuitive-machines.png?w=1580'
    when 'griffin' then 'https://www.nasa.gov/wp-content/uploads/2026/05/astrobotic.jpg?w=2048'
    when 'viper' then 'https://www.nasa.gov/wp-content/uploads/2026/05/jsc2024e059358.jpg?w=2048'
    when 'ltv' then 'https://www.nasa.gov/wp-content/uploads/2025/07/ltv-concept.png?w=1920'
    when 'pressurized-rover' then 'https://www.nasa.gov/wp-content/uploads/2026/05/20250331-01.jpg?w=2048'
    when 'gateway' then 'https://www.nasa.gov/wp-content/uploads/2023/03/gateway-full-configuration-hero-image-121123.png'
    when 'lunar-surface-power' then 'https://www.nasa.gov/wp-content/uploads/2026/05/solararray-lander-beautyshot.png?w=2048'
    when 'surface-habitat' then 'https://www.nasa.gov/wp-content/uploads/2026/05/mph-beautyshot.png?w=2048'
    when 'moonfall-drones' then 'https://www.nasa.gov/wp-content/uploads/2026/05/moonfall-thumbnail-2-clean-1.jpg?w=2048'
    when 'radioisotope-heating-units' then 'https://www.nasa.gov/wp-content/uploads/2026/05/rhu-rover-hopper-beautyshot.png?w=2048'
    when 'lunar-relay-satellites' then 'https://www.nasa.gov/wp-content/uploads/2026/05/lro-beautyshot.png?w=2048'
    when 'site-logistics-rovers' then 'https://www.nasa.gov/wp-content/uploads/2026/05/logistics-rover-beautyshot.png?w=2048'
    when 'nuclear-surface-power' then 'https://www.nasa.gov/wp-content/uploads/2026/05/rtg-beautyshot.png?w=2048'
    when 'solar-power-augmentation' then 'https://www.nasa.gov/wp-content/uploads/2026/05/solararray-lander-beautyshot.png?w=2048'
    when 'surface-communications' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cpnt-surf-terminal-beautyshot.png?w=2048'
    when 'isru-demo' then 'https://www.nasa.gov/wp-content/uploads/2026/05/isru-regolithprocessing-beautyshot.png?w=2048'
    when 'cargo-return-system' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cargo-return-beautyshot.png?w=2048'
    when 'lunar-logistics-network' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cpc-logistics-actionshot.png?w=2048'
    else image_url
  end,
  updated_at = now()
where id in (
  'sls',
  'orion',
  'starship-hls',
  'blue-moon',
  'nova-c',
  'griffin',
  'viper',
  'ltv',
  'pressurized-rover',
  'gateway',
  'lunar-surface-power',
  'surface-habitat',
  'moonfall-drones',
  'radioisotope-heating-units',
  'lunar-relay-satellites',
  'site-logistics-rovers',
  'nuclear-surface-power',
  'solar-power-augmentation',
  'surface-communications',
  'isru-demo',
  'cargo-return-system',
  'lunar-logistics-network'
);
