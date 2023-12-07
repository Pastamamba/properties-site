import {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {CottageImage} from "./CottageImage.jsx";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';

import "../styles/propertydetail.css";
import {OneImageCarousel} from "./OneImageCarousel.jsx";
import {Grid} from "@mui/material";

const PropertyDetail = () => {
    const {propertyId} = useParams();
    const [property, setProperty] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const containerRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchProperty = async () => {
            const propertiesData = await import('../properties/properties.json');
            const selectedProperty = propertiesData.properties.find(p => p.id === propertyId);
            setProperty(selectedProperty);
        };

        fetchProperty();
    }, [propertyId]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const scrollToImage = (index) => {
        setActiveImageIndex(index); // Set new active image index
        const imageElement = document.getElementById(`image${index + 1}`);
        if (imageElement && containerRef.current) {
            containerRef.current.scrollTo({
                left: imageElement.offsetLeft,
                behavior: 'smooth',
            });
        }
    };

    const handleLeftClick = () => {
        if (activeImageIndex > 0) {
            scrollToImage(activeImageIndex - 1);
        }
    };

    const handleRightClick = () => {
        if (activeImageIndex < property.imgs.length - 1) {
            scrollToImage(activeImageIndex + 1);
        }
    };

    return (
        <div style={{marginTop: "20px"}}>
            {screenWidth <= 550 ? (
                <OneImageCarousel
                    images={property.imgs}
                />
            ) : (
                <div className={"images-content"}>
                    <div className={`images`} ref={containerRef}>
                        {property.imgs.map((image, index) => (
                            <CottageImage
                                loading="lazy"
                                alt={"cottage-image"}
                                id={`image${index + 1}`}
                                key={`image${index + 1}`}
                                src={image}
                                onLoad={(e) => e.target.classList.add("loaded")}
                            />
                        ))}
                    </div>
                    <div className={"slide left"} onClick={handleLeftClick}>
                        <ChevronLeftIcon style={{color: 'black'}}/>
                    </div>
                    <div className={"slide right"} onClick={handleRightClick}>
                        <ChevronRightIcon style={{color: 'black'}}/>
                    </div>
                    <div className={"btm-sliders"}>
                        {property.imgs.map((_, index) => (
                            <span
                                key={`scroll${index + 1}`}
                                onClick={() => scrollToImage(index)}
                                style={{backgroundColor: activeImageIndex === index ? 'white' : ''}} // Highlight the active image
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className={'property-detail-div'}>
                <h1>{property.type}</h1>

                <div className={"property-rooms"}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} md={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <ShowerIcon sx={{mr: 2}}/> {property.bathrooms}
                        </Grid>
                        <Grid item xs={2} md={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <BedIcon sx={{mr: 2}}/> {property.bedrooms}
                        </Grid>
                    </Grid>
                </div>

                <div className={'property-detail-description'}>
                    <p>{property.description}</p>
                </div>
                <div className={'location-div'}>
                <img style={{
                    maxWidth: "500px",
                }} src={property.locationImg} alt={"location-img"}/>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
