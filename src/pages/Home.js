import React from 'react';
import Header from '../components/header/Header';
import Caro from '../components/carousel/Caro';
import Category from '../components/categories/Category';
const Home = ({email}) => {
  return (
    <div>
      <Header email = {email}/>
      <Caro />
      <Category/>
      
      
     
    </div>
  );
};

export default Home;
