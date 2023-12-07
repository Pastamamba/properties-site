import { useState, useCallback } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const OneImageCarousel = ({ images }) => {
    // Define state variable 'current' to track the currently displayed image index.
    const [current, setCurrent] = useState(0);

    // Define a callback function to handle clicking the left arrow.
    const handleLeftArrowClick = useCallback(() => {
        // Update 'current' to the previous image index, wrapping around if at the first image.
        setCurrent((current) => (current === 0 ? images.length - 1 : current - 1));
    }, [images]);

    // Define a callback function to handle clicking the right arrow.
    const handleRightArrowClick = useCallback(() => {
        // Update 'current' to the next image index, wrapping around if at the last image.
        setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
    }, [images]);

    return (
        <div className="images-content">
            <div className="images">
                {/* Display the currently selected image */}
                <img
                    alt={"cottage-image"}
                    src={images[current]}
                    loading="lazy"
                />
            </div>
            {/* Left arrow for navigating to the previous image */}
            <div onClick={handleLeftArrowClick} className="slide left">
                <span className="fas fa-angle-left"><ChevronLeftIcon/></span>
            </div>
            {/* Right arrow for navigating to the next image */}
            <div onClick={handleRightArrowClick} className="slide right">
                <span className="fas fa-angle-right"> <ChevronRightIcon/> </span>
            </div>
        </div>
    );
};
