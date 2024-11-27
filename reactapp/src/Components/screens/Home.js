import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Carousal from '../Carousal';
import FoodList from '../FoodList';
import './Home.css';
import HotelList from '../HotelList';


function Home({ updateCart, cart, placeOrder }) {
  return (
    <div>
      <div><Navbar /></div>
      <div><Carousal /></div>
      <h3 className="main-course-heading">Main Course</h3>
      <hr />
      <div><FoodList updateCart={updateCart} /></div>
      <hr />
      <h3 className="main-course-heading">Hotels</h3>
      <hr />
      <div><HotelList /></div>
     
      <div><Footer /></div>
    </div>
  );
}

export default Home;
