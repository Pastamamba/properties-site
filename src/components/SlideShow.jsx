import {Suspense, useState, memo} from 'react';
import {
    containerStyles,
    sliderStyles,
    slideStyles
} from './styles/SlideShow.jsx';
import styled from "styled-components";
import "./styles/slideShow.css"

const StyledLazyAdvancedImage = styled.div`
  max-height: 300px;
  width: 100%;
  object-fit: unset;
  transition: all 0.5s ease-in-out;

  @media (max-width: 400px) {
  }

  @media (max-width: 350px) {
  }
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export const SlideShow = memo(({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleImages = images.slice(0, 6);


    const goPrevious = () => {
        const newIndex = currentIndex === 0 ? visibleImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goNext = () => {
        const newIndex = currentIndex === visibleImages.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <span style={containerStyles}>

      <span style={sliderStyles}>
        {visibleImages.map((image, index) => {
            return (
                <Slide key={index} isVisible={index === currentIndex}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <StyledLazyAdvancedImage>
                            <img className={"slide-image"} src={image} alt="Slideshow image" loading="lazy" />
                        </StyledLazyAdvancedImage>
                    </Suspense>
                </Slide>
            );
        })}

          <span className={'left-arrow'} onClick={goPrevious}>
          {'<'}
        </span>
        <span className={'right-arrow'} onClick={goNext}>
          {'>'}
        </span>
        <span style={slideStyles}/>
      </span>
    </span>
    );
});
