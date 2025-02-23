// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'animate.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
// import Slide from './Slide'

import bgimg1 from '../assets/images/Employee-growth-and-development.webp'
import bgimg2 from '../assets/images/pexels-rebrand-cities-1367272.webp'
import Slide from './Slide'

export default function Carousel() {
    return (
        <div className='container px-6 py-5 mx-auto'>
            {/* <h1 className='text-center mb-2 text-4xl text-[#eca12c] font-semibold animate__animated animate__bounce animate__delay-2s animate__infinite'>Hey volunteers!</h1> */}
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <Slide
                        image={bgimg1}
                        text='HR'
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgimg2}
                        text='Employee'
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
