import Sidebar from '@/components/Sidebar';
import SkeletonLoader from '@/components/SkeletonLoader';
import { IProduct } from '@/types/product';
import dynamic from 'next/dynamic';
import { memo, Suspense } from 'react';

const ProductCard = dynamic(() => import('@/components/ProductCard'));

const CatalogView = ({
  filteredProducts,
}: {
  isLoading: boolean;
  filteredProducts: IProduct[] | undefined;
}) => {
  return (
    <div className="flex gap-4">
      <Sidebar />
      <div className="container mx-auto">
        <Suspense fallback={<SkeletonLoader />}>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product.id} {...product} />)
            ) : (
              <p className="col-span-3 text-center text-xl">No products found.</p>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};
export default memo(CatalogView);
