import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import FeaturedPropertiesHome from "../../components/featuredPropertiesHome/FeaturedPropertiesHome";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./home.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Top 3 most famous landmarks in India</h1>
        <Featured/>
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Lakshadweep</h1>
        <div
          style={{
            paddingTop: '15px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '100%',
            maxWidth: '1024px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            zIndex: '1',
          }}
        >
          <p style={{ color: '#888' }}>
            Lakshadweep, an enchanting archipelago in the Arabian Sea, lures travelers with its pristine beauty and tropical allure. Nestled off the southwestern coast of India, this hidden gem comprises 36 coral islands, each adorned with white sandy beaches and crystal-clear turquoise waters. Accessible by boat or air, Lakshadweep promises an idyllic escape for those seeking a serene tropical paradise. Blessed with vibrant coral reefs, the underwater world of Lakshadweep beckons snorkelers and divers to explore its mesmerizing marine life. The kaleidoscopic coral gardens, teeming with exotic fish and sea turtles, create a captivating underwater spectacle. For those yearning for tranquility, Lakshadweep's secluded beaches offer a haven of relaxation. The gentle lull of the waves, coupled with the soft caress of the sea breeze, provides the perfect backdrop for sunbathing and quiet contemplation. Water enthusiasts can partake in thrilling water sports, from kayaking in the shallow lagoons to windsurfing amidst the gentle waves. As the sun sets over the horizon, the islands of Lakshadweep come alive with the vibrant hues of the evening sky.
          </p>
          <img
            src="https://media.istockphoto.com/id/1224349638/photo/coconut-fringed-beach.jpg?s=612x612&w=0&k=20&c=26FO8pa5zcKQdqjhitHZMAgCmF_B-wDD6MDV93v5j6o="
            alt="Image Description"
            style={{ maxWidth: '40%', height: 'auto', borderRadius: '10px' }}
          />
        </div>
        <h1 className="homeTitle" style={{ paddingTop: '30px' }}>Popular Places in India</h1>
        <div className="featured-properties-container">
          <FeaturedPropertiesHome/>
        </div>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
