update public.missions
set
  hero_image_url = case id
    when 'moon-base-i' then 'https://www.nasa.gov/wp-content/uploads/2026/05/blue-origin-mk-1.jpg?w=1950'
    when 'moon-base-ii' then 'https://www.nasa.gov/wp-content/uploads/2026/05/astrobotic.jpg?w=2048'
    when 'moon-base-iii' then 'https://www.nasa.gov/wp-content/uploads/2026/05/intuitive-machines.png?w=1580'
    when 'moonfall-drones' then 'https://www.nasa.gov/wp-content/uploads/2026/05/moonfall-thumbnail-2-clean-1.jpg?w=2048'
    when 'lunar-terrain-vehicles-phase-one' then 'https://www.nasa.gov/wp-content/uploads/2025/07/ltv-concept.png?w=1920'
    when 'radioisotope-heating-units' then 'https://www.nasa.gov/wp-content/uploads/2026/05/rhu-rover-hopper-beautyshot.png?w=2048'
    when 'lunar-relay-observation-satellites' then 'https://www.nasa.gov/wp-content/uploads/2026/05/lro-beautyshot.png?w=2048'
    when 'viper-moon-base' then 'https://www.nasa.gov/wp-content/uploads/2026/05/jsc2024e059358.jpg?w=2048'
    when 'pressurized-rover-phase-two' then 'https://www.nasa.gov/wp-content/uploads/2026/05/20250331-01.jpg?w=2048'
    when 'site-logistics-rovers-phase-two' then 'https://www.nasa.gov/wp-content/uploads/2026/05/logistics-rover-beautyshot.png?w=2048'
    when 'nuclear-surface-power-demo' then 'https://www.nasa.gov/wp-content/uploads/2026/05/rtg-beautyshot.png?w=2048'
    when 'solar-power-augmentation' then 'https://www.nasa.gov/wp-content/uploads/2026/05/solararray-lander-beautyshot.png?w=2048'
    when 'surface-communications-systems' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cpnt-surf-terminal-beautyshot.png?w=2048'
    when 'lunar-habitats-phase-three' then 'https://www.nasa.gov/wp-content/uploads/2026/05/mph-beautyshot.png?w=2048'
    when 'isru-capability' then 'https://www.nasa.gov/wp-content/uploads/2026/05/isru-regolithprocessing-beautyshot.png?w=2048'
    when 'uncrewed-cargo-return' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cargo-return-beautyshot.png?w=2048'
    when 'lunar-logistics-network' then 'https://www.nasa.gov/wp-content/uploads/2026/05/cpc-logistics-actionshot.png?w=2048'
    else hero_image_url
  end,
  updated_at = now()
where id in (
  'moon-base-i',
  'moon-base-ii',
  'moon-base-iii',
  'moonfall-drones',
  'lunar-terrain-vehicles-phase-one',
  'radioisotope-heating-units',
  'lunar-relay-observation-satellites',
  'viper-moon-base',
  'pressurized-rover-phase-two',
  'site-logistics-rovers-phase-two',
  'nuclear-surface-power-demo',
  'solar-power-augmentation',
  'surface-communications-systems',
  'lunar-habitats-phase-three',
  'isru-capability',
  'uncrewed-cargo-return',
  'lunar-logistics-network'
);
