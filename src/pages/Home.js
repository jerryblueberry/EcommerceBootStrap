import React from 'react';
import Header from '../components/header/Header';
import Caro from '../components/carousel/Caro';
import Category from '../components/categories/Category';
import Nearby from '../components/NearbyVendors/Nearby';
const Home = ({email}) => {
  return (
    <div>
      <Header email = {email}/>
      <Caro />
      <Category/>
      <Nearby/>
      
      
     
    </div>
  );
};

export default Home;
