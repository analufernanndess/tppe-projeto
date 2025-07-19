export interface User {
  id: string;
  email: string;
  type: 'fisica' | 'juridica';
  name: string;
  document: string; // CPF ou CNPJ
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  costPrice: number;
  salePrice: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  createdAt: Date;
}
