import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { default as SliderComponent } from "react-slick";

export function Slider() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "16px",
        responsive: [
            {
                breakpoint: 1480,
                settings: {
                    slidesToShow: 5,
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
                    slidesToShow: 4,
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
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-1-vulpix.jpg" alt="Imagem demonstração 1" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-2-vulpix.jpg" alt="Imagem demonstração 2" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-3-vulpix.jpg" alt="Imagem demonstração 3" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-4-vulpix.jpg" alt="Imagem demonstração 4" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-5-vulpix.jpg" alt="Imagem demonstração 5" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-1-vulpix.jpg" alt="Imagem demonstração 6" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-2-vulpix.jpg" alt="Imagem demonstração 7" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-3-vulpix.jpg" alt="Imagem demonstração 8" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-4-vulpix.jpg" alt="Imagem demonstração 9" /></div>
                    <div className="h-64 !w-[16rem] mobile:!w-[21rem] mobile:ml-4"><img className="h-full rounded-2xl pointer-events-none" src="/image-5-vulpix.jpg" alt="Imagem demonstração 10" /></div>
                </SliderComponent>
            </div>
        </div>
    )
}