import React from "react";
import ParticlesBg from "particles-bg";
import './Header.css';
import About from "./About";
import HeaderCarousel from "./HeaderCarousel";

import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Header = () => {
  const navigate = useNavigate();

  const smoothScroll = (target) => {
    const targetElement = document.querySelector(target);
    const targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetOffset,
      behavior: "smooth"
    });
  };

  const handleLoginClick = () => {
    navigate('auth');
  };

  return (
      <>
        <header id="home">
          <ParticlesBg type="circle" bg={true} />

          <nav id="nav-wrap">
            <ul id="nav" className="nav">
              <li className="current">
                <a className="smoothscroll" id='menu' href="#home" onClick={() => smoothScroll("#home")}>
                  Home
                </a>
              </li>
              <li>
                <a className="smoothscroll" id='menu' href="#about" onClick={() => smoothScroll("#about")}>
                  About
                </a>
              </li>
              <li>
                <a className="smoothscroll" id='menu' href="#emotion" onClick={() => smoothScroll("#emotion")}>
                  Testimonials
                </a>
              </li>
              <li>
                <a className="smoothscroll" id='menu' href="#login" onClick={handleLoginClick}>
                  Login/Sign Up
                </a>
              </li>
            </ul>
          </nav>

          <div className="banner-text">
            <h1>IntuitiHire</h1>
          </div>

        </header>
        <About/>
        <HeaderCarousel />
        <Footer />
      </>
  );
}

export default Header;
