export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  specifications?: Record<string, string>
}

export const products: Product[] = [
  // Pipes
  {
    id: 'copper-pipe-3-4',
    name: 'Copper Pipe 3/4"',
    category: 'Pipes',
    price: 45.50,
    image: '/images/product-pipes.jpg',
    description: 'High-quality copper water pipe suitable for plumbing applications',
    specifications: {
      Material: 'Copper Type L',
      'Outer Diameter': '0.875"',
      'Inner Diameter': '0.745"',
      'Length': '10 ft',
      'Temperature': '-20°C to 120°C',
    },
  },
  {
    id: 'pvc-pipe-2',
    name: 'PVC Pipe 2"',
    category: 'Pipes',
    price: 12.00,
    image: '/images/product-pipes.jpg',
    description: 'Durable PVC drainage and pressure pipe',
    specifications: {
      Material: 'PVC Schedule 40',
      'Diameter': '2"',
      'Length': '10 ft',
      'Pressure Rating': '100 PSI',
      'Color': 'White',
    },
  },
  {
    id: 'pex-tubing-1-2',
    name: 'PEX Tubing 1/2"',
    category: 'Pipes',
    price: 0.85,
    image: '/images/product-pipes.jpg',
    description: 'Flexible PEX tubing for water distribution',
    specifications: {
      Material: 'Cross-linked Polyethylene',
      'Diameter': '1/2"',
      'Length': '1 foot',
      'Temperature': '-40°C to 90°C',
      'Pressure': '100 PSI',
    },
  },

  // Valves
  {
    id: 'ball-valve-brass-1',
    name: 'Brass Ball Valve 1"',
    category: 'Valves',
    price: 28.75,
    image: '/images/product-valves.jpg',
    description: 'Full port brass ball valve for water applications',
    specifications: {
      Material: 'Brass Body',
      'Diameter': '1"',
      'Pressure Rating': '600 PSI',
      'Temperature Range': '-20°C to 120°C',
      'Connection': 'Threaded',
    },
  },
  {
    id: 'gate-valve-1-2',
    name: 'Gate Valve 1/2"',
    category: 'Valves',
    price: 15.50,
    image: '/images/product-valves.jpg',
    description: 'Resilient seat gate valve for water supply',
    specifications: {
      Material: 'Ductile Iron',
      'Diameter': '1/2"',
      'Pressure Rating': '200 PSI',
      'Temperature': '0°C to 60°C',
      'Type': 'Resilient Seat',
    },
  },
  {
    id: 'check-valve-1',
    name: 'Check Valve 1"',
    category: 'Valves',
    price: 22.00,
    image: '/images/product-valves.jpg',
    description: 'Spring-loaded check valve to prevent backflow',
    specifications: {
      Material: 'Brass with Stainless Steel Spring',
      'Diameter': '1"',
      'Pressure Rating': '200 PSI',
      'Type': 'Spring-Loaded',
      'Connection': 'Threaded',
    },
  },

  // Fittings
  {
    id: 'elbow-90-brass-1',
    name: '90° Elbow Fitting 1"',
    category: 'Fittings',
    price: 8.50,
    image: '/images/product-fittings.jpg',
    description: 'Brass 90-degree elbow for direction changes',
    specifications: {
      Material: 'Brass',
      'Angle': '90°',
      'Diameter': '1"',
      'Connection': 'Threaded',
      'Pressure': '600 PSI',
    },
  },
  {
    id: 'tee-connector-3-4',
    name: 'Tee Connector 3/4"',
    category: 'Fittings',
    price: 6.25,
    image: '/images/product-fittings.jpg',
    description: 'Three-way tee connector for pipe branching',
    specifications: {
      Material: 'Brass',
      'Diameter': '3/4"',
      'Type': 'Equal Tee',
      'Connection': 'Threaded',
      'Pressure': '600 PSI',
    },
  },
  {
    id: 'union-connector-1-2',
    name: 'Union Connector 1/2"',
    category: 'Fittings',
    price: 12.75,
    image: '/images/product-fittings.jpg',
    description: 'Quick-disconnect union for easy assembly',
    specifications: {
      Material: 'Brass',
      'Diameter': '1/2"',
      'Type': 'Union',
      'Connection': 'Threaded',
      'Pressure': '300 PSI',
    },
  },

  // Gas Parts
  {
    id: 'gas-regulator-propane',
    name: 'Propane Gas Regulator',
    category: 'Gas Parts',
    price: 65.00,
    image: '/images/product-gas-parts.jpg',
    description: 'High-efficiency propane gas regulator for appliances',
    specifications: {
      Type: 'Propane Regulator',
      'Inlet Pressure': '150-250 PSI',
      'Outlet Pressure': '5-12 inches W.C.',
      'Flow Rate': '90 CFH max',
      'Material': 'Aluminum/Stainless Steel',
    },
  },
  {
    id: 'gas-line-1-2-flex',
    name: 'Gas Line Flex 1/2"',
    category: 'Gas Parts',
    price: 18.50,
    image: '/images/product-gas-parts.jpg',
    description: 'Flexible stainless steel gas line connector',
    specifications: {
      Material: 'Stainless Steel Braided',
      'Diameter': '1/2"',
      'Length': '3 feet',
      'Maximum Pressure': '5 PSI',
      'Temperature': '-40°C to 75°C',
    },
  },
  {
    id: 'gas-fitting-brass-male',
    name: 'Gas Fitting Brass Male 1/2"',
    category: 'Gas Parts',
    price: 9.75,
    image: '/images/product-gas-parts.jpg',
    description: 'Standard brass gas fitting for connections',
    specifications: {
      Material: 'Brass',
      'Diameter': '1/2"',
      'Thread Type': 'NPT',
      'Pressure Rating': '500 PSI',
      'Type': 'Male Adapter',
    },
  },

  // Additional Products for variety
  {
    id: 'water-filter-housing',
    name: 'Water Filter Housing',
    category: 'Filters',
    price: 35.00,
    image: '/images/product-pipes.jpg',
    description: 'Complete water filter housing assembly',
    specifications: {
      Material: 'Polypropylene',
      'Cartridge Size': '10"',
      'Flow Rate': '15 GPM',
      'Pressure Rating': '125 PSI',
      'Connection': '3/4" FPT',
    },
  },
  {
    id: 'pressure-gauge-water',
    name: 'Water Pressure Gauge',
    category: 'Gauges',
    price: 16.50,
    image: '/images/product-valves.jpg',
    description: 'Accurate water pressure gauge for monitoring',
    specifications: {
      'Dial Size': '2.5"',
      'Range': '0-100 PSI',
      'Accuracy': '±3%',
      'Connection': '1/4" NPT',
      'Material': 'Stainless Steel',
    },
  },
  {
    id: 'shutoff-valve-angle',
    name: 'Angle Stop Shutoff Valve',
    category: 'Valves',
    price: 19.50,
    image: '/images/product-valves.jpg',
    description: 'Angle stop shutoff valve for fixture supply',
    specifications: {
      Material: 'Brass',
      'Size': '1/2"',
      'Type': 'Angle Stop',
      'Pressure': '125 PSI',
      'Handle': 'Metal Ball Handle',
    },
  },
  {
    id: 'strainer-filter-basket',
    name: 'Strainer Filter Basket 3/4"',
    category: 'Filters',
    price: 14.00,
    image: '/images/product-fittings.jpg',
    description: 'Y-strainer with replaceable filter basket',
    specifications: {
      Material: 'Brass Body',
      'Size': '3/4"',
      'Mesh Size': '100 micron',
      'Pressure': '200 PSI',
      'Connection': 'Threaded',
    },
  },
]
