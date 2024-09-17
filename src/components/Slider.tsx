import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { default as SliderComponent } from "react-slick";

export function Slider() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "16px",
        responsive: [
            {
                breakpoint: 1480,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "-120px"
                }
            },
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "-250px"
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "-200px"
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "0px"
                }
            }
        ]
    }

    return (
        <div className="slider-container w-[100vw] cursor-grab">
            <div className="h-48 !w-[100%] block">
                <SliderComponent {...settings}>
                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-1-vulpix.jpeg" className="w-full h-full object-cover" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden aspect-[16/9]">
                        <img src="/image-2-vulpix.jpeg" className="w-full h-full object-cover" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-3-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-4-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-5-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-6-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-7-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-8-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                        <img src="/image-9-vulpix.jpeg" className="w-full h-full" />
                    </div>

                    <div className="h-64 !w-[26rem] mobile:!w-[21rem] mobile:ml-4 rounded-2xl overflow-hidden">
                    <img src="/image-10-vulpix.jpeg" className="w-full h-full" />
                    </div>
                </SliderComponent>
            </div>
        </div>
    )
}