import React, { useEffect, useRef } from 'react';
import {FaUser, FaPhone, FaEnvelope, FaRupeeSign, FaClock, FaFileInvoice, FaPercentage, FaMobileAlt, FaMoneyCheckAlt, FaHeadset, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import logo from '../Assets/ohobo2.png';
import logo1 from '../Assets/ohobo3.png';
import logo2 from '../Assets/ohobo4.png';
import logo3 from '../Assets/ohobo5.png';
import headerImage from '../Assets/ohobo1.png';
import promiseImage from '../Assets/ohobo6.png';
import additionalImage from '../Assets/hobo7.png';
import './travel.css';
import ScrollReveal from 'scrollreveal';

const OravelTravel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    ScrollReveal().reveal('.promise-section', {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      delay: 300,
      easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.promise-section img', {
      origin: 'right',
      distance: '50px',
      duration: 1000,
      delay: 400,
      easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.additional-section', {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      delay: 400,
      easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.additional-section img', {
      origin: 'right',
      distance: '50px',
      duration: 1000,
      delay: 600,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <div className="oravel-travel">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Oravel Travel Solutions Logo" />
          <span>Corporate booking solution</span>
        </div>
        <div className="navbar-contact">
          <a href="tel:01246201381"><FaPhone /> 0124 6201381</a>
          <a href="mailto:oraveltravelsolutions@oyorooms.com"><FaEnvelope /> oraveltravelsolutions@oyorooms.com</a>
        </div>
      </nav>
      <header className="header-section" style={{ backgroundImage: `url(${headerImage})` }}>
        <div className="header-content">
          <h1>Unlock special prizes for your startup exclusively with Oravel Travel Solutions.</h1>
          <p>Save up to 70% | Get a dedicated Oravel Travel Manager | Fixed Price throughout the year.</p>
          <form className="get-started-form">
            <h2>Get Started</h2>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Company" />
            <input type="email" placeholder="Email ID" />
            <input type="text" placeholder="Mobile" />
            <input type="text" placeholder="City" />
            <button type="submit">Register Now</button>
          </form>
        </div>
      </header>
      <section className="info-section">
        <h2><strong>Oravel Travel Solutions is an innovative offering for corporates by OHOBO, India’s largest hospitality company.</strong></h2>
        <div className="info-cards">
          <div className="info-card">
            <img src={logo1} alt="Countries Icon" />
            <p>80 Countries</p>
          </div>
          <div className="info-card">
            <img src={logo2} alt="Cities Icon" />
            <p>800+ Cities and Towns</p>
          </div>
          <div className="info-card">
            <img src={logo3} alt="Hotels Icon" />
            <p>43,000+ Hotels</p>
          </div>
        </div>
      </section>
      <section className="promise-section">
        <div className="promise-text">
          <h2>Oravel Travel Solutions Promises</h2>
          <div className="promise-item">
            <FaRupeeSign className="promise-icon" />
            <h3>Save Cost</h3>
            <p>Get easy access to 4000+ OYO properties with up to 40% savings, manage all your company bookings on a single portal, and say good-bye to third-party commissions.</p>
          </div>
          <div className="promise-item">
            <FaClock className="promise-icon" />
            <h3>Save Time</h3>
            <p>With Oravel Travel Solutions' effortless interface, have all your bookings at your fingertips anytime you need them.</p>
          </div>
          <div className="promise-item">
            <FaFileInvoice className="promise-icon" />
            <h3>Provide Transparency</h3>
            <p>Get invoices directly from us without any human intervention, and always be in the know.</p>
          </div>
        </div>
        <div className="promise-image">
          <img src={promiseImage} alt="Promises" />
        </div>
      </section>
      <section className="additional-section">
        <div className="additional-image">
          <img src={additionalImage} alt="Additional Benefits" />
        </div>
        <div className="additional-text">
          <h1><strong>There's more!</strong></h1>
          <p><FaPercentage className="additional-icon" /> Hassle-Free GST</p>
          <p><FaFileInvoice className="additional-icon" /> Automatic and easy invoices</p>
          <p><FaMoneyCheckAlt className="additional-icon" /> Track payments effortlessly</p>
          <p><FaMobileAlt className="additional-icon" /> Built-in approval flow and custom budget limits</p>
          <p><FaHeadset className="additional-icon" /> Get 24/7 support from OHOBO Captains</p>
        </div>
      </section>
      <footer className="footer-section">
        <div className="container">
          <h1>Stories from those<br /> who love us</h1>
          <div className="footer-arrows">
            <FaArrowLeft className="arrow-icon" onClick={() => scroll('left')} />
            <FaArrowRight className="arrow-icon" onClick={() => scroll('right')} />
          </div>
          <div className="footer-cards" ref={scrollRef}>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="footer-card card">
                <div className="card-body">
                  <p>"oHobo corporate portal, expense tracking feature and GST proposition have made travel convenient and efficient for our employees. Additionally, with this partnership we are saving significantly on our travel expenses."</p>
                  <div className="contact-info">
                    <FaUser className="contact-icon" />
                    <p>Vishal Sehgal - Co-Founder & Director, Lava International Ltd</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OravelTravel;
