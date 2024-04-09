import React from "react";
import { CarouselItem, CarouselCaption, Carousel } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

//images
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const ImageCarousel: React.FC = () => {
  const slides = [
    {
      title: "Our Mission",
      text: "Here at Nextbank, we understand that Your time matters. Our goal is to make banking easy and hassle-free, so You can focus on what is really important",
      image: slide1,
    },
    {
      title: "Grow With Us",
      text: "With Us Your funds will grow at a steady pace. Don't worry though, they will be available when you need them most.",
      image: slide2,
    },
    {
      title: "Quicker Than Ever",
      text: "Need some funds to get started? Our services are available wherever and whenever you need.",
      image: slide3,
    },
  ];

  return (
    <Carousel controls={true} interval={15000}>
      {slides.map((slide, index) => (
        <CarouselItem
          key={index}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "800px",
          }}
        >
          <CarouselCaption
            style={{
              padding: "50px",
              top: "auto",
              bottom: "0",
              left: "0",
              right: "50%",
              textAlign: "left",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <h1>{slide.title}</h1>
            <p style={{ fontSize: "2.0rem" }}>{slide.text}</p>
          </CarouselCaption>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
