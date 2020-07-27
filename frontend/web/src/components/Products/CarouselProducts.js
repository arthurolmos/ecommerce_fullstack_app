
import React, { useState, useContext } from 'react'
import { 
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Spinner
} from 'reactstrap'
import styled from 'styled-components'

export default function CarouselProducts(props) {
    
    const { carousel } = props

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === carousel.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? carousel.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = carousel.map((item) => {
        const { src, altText, key } = item

        return (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={key}
        >
            <CarouselImage src={src} alt={altText} />
        </CarouselItem>
        );
    });

    return (
        // loading? 
        //     <Spinner color='danger' className='mt-3'/>
        //     :
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                className='w-100'
                noGutters
            >   
                <CarouselIndicatorsStyled items={carousel} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControlStyled direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControlStyled direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
    );
}


const CarouselImage = styled.img`
    height: 400px;
    width: 100%;
    @media (max-width: 414px){
        height: 200px;
    }
`

const CarouselIndicatorsStyled = styled(CarouselIndicators)`
`

const CarouselControlStyled = styled(CarouselControl)`
    height: 300px;
    @media (max-width: 414px){
        height: 200px;
    }
`