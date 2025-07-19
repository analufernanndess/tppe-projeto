'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';
import { useApp } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';

export default function HomePage() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.user) {
      router.push('/login');
    }
  }, [state.user, router]);

  if (!state.user) {
    return null;
  }

  const handleAddToCart = (product: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Produtos em Destaque
          </h1>
          <p className="text-gray-600">
            Descubra os melhores produtos de tecnologia com preços incríveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Fabricante: {product.manufacturer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Preço de custo:</span>
                    <span className="font-medium">
                      R${' '}
                      {product.costPrice.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-green-600">
                      Preço de venda:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      R${' '}
                      {product.salePrice.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
