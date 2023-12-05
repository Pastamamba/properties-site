import {useState, useCallback} from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const OneImageCarousel = ({images}) => {
    const [current, setCurrent] = useState(0);

    const handleLeftArrowClick = useCallback(() => {
        setCurrent((current) => (current === 0 ? images.length - 1 : current - 1));
    }, [images]);

    const handleRightArrowClick = useCallback(() => {
        setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
    }, [images]);

    return (
        <div className="images-content">
            <div
                className="images"
            >
                <img
                    alt={"cottage-image"}
                    src={images[current]}
                    loading="lazy"
                />
            </div>
            <div onClick={handleLeftArrowClick} className="slide left">
                <span className="fas fa-angle-left"><ChevronLeftIcon/></span>
            </div>
            <div onClick={handleRightArrowClick} className="slide right">
                <span className="fas fa-angle-right"> <ChevronRightIcon/> </span>
            </div>
        </div>
    );
};
