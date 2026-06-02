alter table public.missions
add column if not exists classification_label text;

update public.missions
set
  classification_label = case id
    when 'moon-base-i' then 'Key Mission'
    when 'moon-base-ii' then 'Key Mission'
    when 'moon-base-iii' then 'Key Mission'
    when 'moonfall-drones' then 'Key Mission'
    when 'lunar-terrain-vehicles-phase-one' then 'Key Surface Assets'
    when 'radioisotope-heating-units' then 'Key Demonstration'
    when 'lunar-relay-observation-satellites' then 'Key Orbital Assets'
    when 'viper-moon-base' then 'Key Mission'
    when 'pressurized-rover-phase-two' then 'Key Surface Asset'
    when 'site-logistics-rovers-phase-two' then 'Key Surface Assets'
    when 'nuclear-surface-power-demo' then 'Key Demonstration'
    when 'solar-power-augmentation' then 'Key Demonstration'
    when 'surface-communications-systems' then 'Key Infrastructure'
    when 'lunar-habitats-phase-three' then 'Key Infrastructure'
    when 'isru-capability' then 'Key Capability'
    when 'uncrewed-cargo-return' then 'Key Capability'
    when 'lunar-logistics-network' then 'Key Capability'
    else classification_label
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
