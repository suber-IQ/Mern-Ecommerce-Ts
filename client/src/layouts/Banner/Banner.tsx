import Slider from 'react-slick';

const Banner = () => {
      const settings = {
            // Configuration the setting for the slider
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            // autoplaySpeed: 2000,
      }
  return (
    <Slider {...settings}>
         <div>
            <img className='w-full h-auto' src="https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/70b213d755201840.jpeg?q=50" alt="banner" />
         </div>
         <div>
         <img className='w-full' src="https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/6a46d1114486b4a2.jpeg?q=50" alt="banner" />
         </div>
         <div>
         <img className='w-full' src="https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/d88108d331a9bb91.png?q=50" alt="banner" />
            
         </div>
    </Slider>
  )
}

export default Banner