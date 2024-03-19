import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd"; // Import Spin component
import Navbar from "../../components/navbar/Navbar";
import HeaderforVirtualTour from "../../components/headerforVirtualTour/HeaderforVirtualTour";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { Card } from "antd";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import './virtualTourPlaces.css';
import qr from "../../assets/qr.png"

const VirtualTourPlaces = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const location = useLocation();
  const searchQuery = location.state ? location.state.title : "";

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/virtualTour/")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <HeaderforVirtualTour />
      <div className="virtual-tour-details">
        {/* Use Spin component while loading */}
        <Spin tip="Loading..." spinning={loading}>
          <div className="card-container" style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredData.length === 0 ? (
              // Check if there are no search results
              <p>No results found for your search.</p>
            ) : (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: "25%",
                    marginBottom: '20px',
                    boxSizing: "border-box",
                  }}
                >
                  <Card
                    hoverable
                    style={{
                      width: "75%",
                      marginTop: "20px",
                      marginLeft: "50px",
                      marginRight: "50px",
                      boxSizing: "5px"
                    }}
                    cover={
                      <img
                        src={item.photos[0]}
                        style={{
                          width: "100%",
                          height: "200px",
                          // objectFit: "cover",
                        }}
                      />
                    }
                  >
                    <h3>{item.title}</h3>
                    <p style={{ marginBottom: "10px", color: 'black' }}> {item.location} <span style={{ color: 'gray', fontSize: '12px' }}></span></p>
                    <p style={{ marginBottom: "30px", color: 'gray', fontSize: '12px', textAlign: "justify" }}>
                      {item.description.length > 200 ? `${item.description.substring(0, 70)}...` : item.description}
                    </p>

                    <Link to={`/virtualTour/${item._id}`}>
                      <button className="headerBtn" style={{ width: '100%' }}>Virtual Tour</button>
                    </Link>
                  </Card>
                </div>
              ))
            )}
          </div>
        </Spin>
      </div>
      <div className="ar-exp">
        <div className="ar-title">
        <h4>To Experience the AR Monuments, Please do scan the below QR & then scan the image that you want to Experience AR</h4>
        </div>
        <img src={qr} style={{width: "100px", height: "100px"}}/>
        <p> Scan Me😍</p><br/>
        <p>[<span><b>Note: &nbsp;</b></span>At present AR Experience is available only for <b>TajMahal</b>, <b>Eiffer Tower</b>, <b>Charminar</b>, <b>Big Ben Clock Tower</b> and <b>Qutub Minor</b>]</p>
      </div>
      <div className="centered-maillist">
        <MailList />
      </div>
      <div className="centered-footer">
        <Footer />
      </div>
    </div>
  );
}

export default VirtualTourPlaces;
