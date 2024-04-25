import React, { Component } from "react";
import "./About.css";
import audioimage from './assets/audio.jpg';
import videoimage from './assets/video.jpg';
import textimage from './assets/text.jpg';

import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';
import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg';
import img8 from './assets/img8.jpg';
import img9 from './assets/img9.jpg';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        { src: img1, id: 1 },
        { src: img2, id: 2 },
        { src: img3, id: 3 },
        { src: img4, id: 4 },
        { src: img5, id: 5 },
        { src: img6, id: 6 },
        { src: img7, id: 7 },
        { src: img8, id: 8 },
        { src: img9, id: 9 }
      ],
    };
  }

  componentDidMount() {
    // Set up the animation timer
    this.animationTimer = setInterval(() => {
      this.setState((prevState) => {
        const firstImage = prevState.images[0];
        const images = prevState.images.slice(1); // Remove the first image
        images.push(firstImage); // Add the removed image to the end
        return { images };
      });
    }, 3000); // Change image every 3 seconds
  }

  componentWillUnmount() {
    clearInterval(this.animationTimer); // Clear the animation timer when unmounting
  }

  
  
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    const { images } = this.state;
    return (
      <>

        <section id="about">
        
          <div className="about-heading">
            <h1>What We Offer</h1>
          </div>
          <div className="about-container">
            <div className="about-item">
              <img src={audioimage} alt="Image 1" />
              <p>We determine the emotional state of the interviewee with the change in tones of their speech.</p>
            </div>
            <div className="about-item">
              <img src={videoimage} alt="Image 2" />
              <p>We examine the facial expressions and eye movements to ascertain emotion of the interviewee and track their gaze.</p>
            </div>
            <div className="about-item">
              <img src={textimage} alt="Image 3" />
              <p>With the lingual analysis we figure out the interviewee's Ocean's personality.</p>
            </div>
          </div>
          </section>

          
          <div className="about-secondHeading">
          <h1 >Emotion Analysis</h1>
          </div>
            
          
          <div className="emotion-container">
          <Slider {...settings} style={{ maxWidth: "95%", margin: "0 auto" }}>
            {images.map((image) => (
              <div key={image.id} className="about-emotion">
                {/* Render the moving image */}
                <img
                  src={image.src}
                  alt="Image"
                  
                  // className={`moving-image`}
                  style={{ width: "100%", padding: 10 }}
                />
              </div>
               ))}
          </Slider>
               </div>
          
      </>
    );
  }
}

export default About;
{/* <img
                src={videoItem.videoSrc}
                alt={videoItem.name}
                style={{ width: "100%", padding: 10 }}
              /> */}
