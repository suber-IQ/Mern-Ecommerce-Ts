import CustomCard from "../../components/Card/CustomCard"
import CustomHeading from "../../components/Heading/CustomHeading"
import CustomRouteLink from "../../components/RouteLink/CustomRouteLink"
import products from "./product"

const ProductCard = () => {
  return (
   <div className="md:container md:mx-auto w-full space-x-4">
      <CustomHeading className="m-3" children="Product" />
      <div className="flex space-x-2 space-y-2 flex-wrap justify-envenly">
     {
      products && products.map((item) => (
           <CustomRouteLink to="/product/1">
             <CustomCard
            key={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            className="border mt-3 border-gray-200 bg-gray-100"
             /> 
           </CustomRouteLink>
      ))
     }
       
      </div>
   </div>
  )
}

export default ProductCard