import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeGenre from './HomeGenre';
import HomeArtist from './HomeArtist';

const Home = () => {

    return (
        <div className='container-fluid home-container'>
            <HomeGenre></HomeGenre>
            <HomeArtist></HomeArtist>
        </div>
    );
};
export default Home;

