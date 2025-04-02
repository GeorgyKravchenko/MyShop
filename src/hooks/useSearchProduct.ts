import { useGetProductsQuery } from "@/lib/api/product.api"
import { useMemo } from "react"

export const useSearchProduct=(title:string)=>{
    const {data,isLoading,isSuccess}=useGetProductsQuery(100)
    const filteredData=useMemo(()=>data?.filter(product=>product.title.toLowerCase().includes(title.toLowerCase())),[title,data])
    return {filteredData,isLoading,isSuccess}
}