import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../types/product';

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 9.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
  { id: 3, name: 'Product 3', price: 29.99 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  res.status(200).json(products);
}