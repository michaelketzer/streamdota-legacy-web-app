import Slider from "react-slick";
import { ReactElement } from "react";
import Betting from "./Slides/Betting";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
};

export default function FullPageSlider(): ReactElement {
    return <>
        <Slider {...settings}>
            <div className={'slide'}>
                <Betting />
            </div>
        </Slider>

        <style jsx>{`
            .slide {
                width: 100%;
                height: 100%;
            }
        `}</style>
    </>;
}