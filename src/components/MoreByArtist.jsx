import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MoreByArtist = ({ artistId }) => {
    console.log("MoreByArtist", artistId);
    const [artists, setArtist] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/artists/${artistId}`)
            .then(response => response.json())
            .then(data => setArtist(data))
    }, [artistId]);
    return (
        <div className='genre-title d-flex justify-content-between align-items-center my-2'>
            <Link to={`/artist/${artistId}`} className='genre-name'>More By {artists.name}</Link>
            <Link to={`/artist/${artistId}`} className='genre-show-all'>Show all</Link>
        </div>
    );
};
export default MoreByArtist;