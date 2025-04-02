import ProductCard from "@/components/ProductCard"
import Sidebar from "@/components/Sidebar"
import { IProduct } from "@/types/product"
import { memo } from "react"

 const CatalogView = ({isLoading,filteredProducts}:{isLoading:boolean,filteredProducts:IProduct[]|undefined}) => {
    return (
        <div className="flex gap-4">
      <Sidebar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <p className="text-center text-9xl w-full">Loading...</p>
          ) : (
            filteredProducts?.map(product => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>
      </div>
    </div>
    )
}
export default memo(CatalogView)