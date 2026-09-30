export type Casino = { name: string; region: string; position: [number, number] };

// Shared by the accessible list and the interactive map.
export const casinos: Casino[] = [
  { name: 'Encore Boston Harbor', region: 'Massachusetts', position: [42.4070, -71.0536] },
  { name: 'Parx Casino', region: 'Pennsylvania', position: [40.0871, -74.9083] },
  { name: 'Chasers Poker Room', region: 'New Hampshire', position: [42.7855, -71.2690] },
  { name: 'Metro Casino', region: 'Puerto Rico', position: [18.4657, -66.1057] },
  { name: 'Caesars New Orleans', region: 'Louisiana', position: [29.9511, -90.0715] },
  { name: 'Playground Card Room', region: 'Montreal', position: [45.4947, -73.7109] },
  // 1788 N. First Street, verified against bay101.com and OSM way 700977517.
  { name: 'Bay 101', region: 'San Jose, California', position: [37.3696266, -121.9135235] },
];
