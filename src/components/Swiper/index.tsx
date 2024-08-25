import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export function Swiper() {
    return (
        <>
            <SwiperComponent
                slidesPerView={2}
                spaceBetween={50}
                className="w-[82%] cursor-grab select-none"
            >
                <SwiperSlide className="bg-white-gray !w-[30rem] !h-64 rounded-[2.4rem] !flex flex-col justify-center pl-10">
                    <h4 className="text-purple text-xl font-bold mb-2">Lorem Ipsum</h4>
                    <p className="text-[1.04rem] w-80">Lorem <span className="font-semibold">ipsum</span> dolor sit amet consectetur adipisicing elit. Debitis rem earum quos quisquam.</p>
                </SwiperSlide>

                <SwiperSlide className="bg-white-gray !w-[30rem] !h-64 rounded-[2.4rem] !flex flex-col justify-center pl-10">
                    <h4 className="text-purple text-xl font-bold mb-2">Lorem Ipsum</h4>
                    <p className="text-[1.04rem] w-80">Lorem <span className="font-semibold">ipsum</span> dolor sit amet consectetur adipisicing elit. Debitis rem earum quos quisquam.</p>
                </SwiperSlide>

                <SwiperSlide className="bg-white-gray !w-[30rem] !h-64 rounded-[2.4rem] !flex flex-col justify-center pl-10">
                    <h4 className="text-purple text-xl font-bold mb-2">Lorem Ipsum</h4>
                    <p className="text-[1.04rem] w-80">Lorem <span className="font-semibold">ipsum</span> dolor sit amet consectetur adipisicing elit. Debitis rem earum quos quisquam.</p>
                </SwiperSlide>
            </SwiperComponent>
        </>
    )
}