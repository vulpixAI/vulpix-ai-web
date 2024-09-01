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
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                    <div className="h-64 !w-[30rem] rounded-2xl bg-white"></div>
                </SliderComponent>
            </div>
        </div>
    )
}