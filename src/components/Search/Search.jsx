import React, { useState, useEffect } from 'react';
import HomeArtist from '../Home/HomeArtist';
import ArtistAlbums from '../Artists/ArtistAlbums';

const Search = () => {
    const styleInput = {
        color: 'white',
        backgroundColor: "#212121",
        border: 'none',
        height: '50px',
    }

    return (
        <div className='container-fluid'>
            <input type="text" className='form-control w-50 my-2'
                style={styleInput}
                placeholder='Searach...' />
            <HomeArtist></HomeArtist>
        </div>
    );
};
export default Search;