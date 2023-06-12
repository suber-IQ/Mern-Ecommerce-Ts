import ProductCard from '../../features/Product/ProductList'
import Banner from '../../layouts/Banner/Banner'

const HomePage = () => {
  return (
      <>
       <div className='-z-40'>
        <Banner />
        </div>
        <ProductCard />
      </>
  )
}

export default HomePage