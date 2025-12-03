export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pure' | 'Gold' | 'Fire';
  image: string;
  labelColor: string;
}

export interface BatchData {
  code: string;
  harvestDate: string;
  pondId: string;
  phLevel: string;
  feedType: string;
  processingTime: string;
  status: 'Verified' | 'Pending';
}

export interface Order {
  id: string;
  customerName: string;
  items: { productName: string; quantity: number }[];
  total: number;
  status: 'Pending' | 'Shipped';
  date: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iikan PURE',
    description: 'Fillet patin segar kualitas ekspor. Tekstur daging lembut, putih bersih, bebas duri dan bau tanah. Sangat cocok untuk MPASI bayi atau menu diet sehat keluarga.',
    price: 45000,
    category: 'Pure',
    image: '/products/iikan-pure.png',
    labelColor: 'blue',
  },
  {
    id: '2',
    name: 'iikan GOLD',
    description: 'Praktis! Ikan marinasi bumbu kuning tradisional (kunyit, lengkuas, serai) yang kaya rempah. Bumbu meresap sempurna, tinggal langsung goreng. Solusi masak anti ribet.',
    price: 55000,
    category: 'Gold',
    image: '/products/iikan-gold.png',
    labelColor: 'yellow',
  },
  {
    id: '3',
    name: 'iikan FIRE',
    description: 'Tantangan pedas! Fillet ikan dengan baluran bumbu rica-rica cabai asli yang tebal dan berminyak. Pedasnya nendang, bikin makan nambah terus. Khusus pecinta pedas sejati.',
    price: 60000,
    category: 'Fire',
    image: '/products/iikan-fire.png',
    labelColor: 'red',
  },
];

export const BATCHES: BatchData[] = [
  {
    code: 'BATCH-JBG-01',
    harvestDate: '02 Des 2025, 06:00 WIB',
    pondId: 'Kolam Deras A3 - Jombang',
    phLevel: 'pH 7.2 Stabil - Bebas Limbah',
    feedType: 'Pelet Organik High Protein',
    processingTime: '02 Des 2025, 09:00 WIB',
    status: 'Verified',
  },
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Budi Santoso',
    items: [{ productName: 'iikan PURE', quantity: 2 }],
    total: 90000,
    status: 'Pending',
    date: '2023-10-26',
  },
];
