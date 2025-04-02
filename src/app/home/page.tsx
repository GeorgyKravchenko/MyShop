'use client'
import ProductCard from '@/components/ProductCard'
import { useSearchProduct } from '@/hooks/useSearchProduct'
import { getData } from '@/lib/firebase/getData'
import { motion } from 'framer-motion'
import  { memo } from 'react'

 const HomePage = () => {
  const {filteredData,isLoading}=useSearchProduct('')
  getData('carts')
  return (
    <div>
      {isLoading && <p className='text-center text-9xl'>Loading...</p>}  
       <motion.ul className='grid grid-cols-4 gap-5'>
        {filteredData?.map(product=><motion.li key={product.id} initial={{scale:0}} animate={{scale:1}}><ProductCard  {...product} /></motion.li>
        )}
      </motion.ul>
    </div>
  )
}
export default memo(HomePage)