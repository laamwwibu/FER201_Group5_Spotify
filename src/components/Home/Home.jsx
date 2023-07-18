import React from 'react';
import HomeGenre from './HomeGenre';
import HomeArtist from './HomeArtist';
import HomeDiscover from './HomeDiscover';

const Home = () => {

    return (
        <div className='container-fluid home-container'>
            <HomeDiscover></HomeDiscover>
            <HomeGenre></HomeGenre>
            <HomeArtist></HomeArtist>
        </div>
    );
};
export default Home;

