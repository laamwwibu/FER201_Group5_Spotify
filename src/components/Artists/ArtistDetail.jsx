import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import ArtistAlbums from './ArtistAlbums';

const ArtistDetail = () => {
    const { artistId } = useParams();
    const [artists, setArtist] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/artists/${artistId}`)
            .then(response => response.json())
            .then(data => setArtist(data))
    }, []);
    console.log()
    return (
        <div className='container-fluid nopadding'>
            <div className='row artist-profile'>
                <div className='artist-profile-image'
                    style={{
                        backgroundImage: `url(${artists.img})`,
                        height: "300px",
                        position: "relative"
                    }}>
                    <div className='artist-profile-overlay'></div>
                    <div className='artist-profile-body'
                        style={{
                            position: "absolute",
                            bottom: "0",
                            left: "100",
                            padding: "10px"
                        }}>
                        <p className='text-white'>Artist</p>
                        <h1 className='text-white'>{artists.name}</h1>
                    </div>
                </div>
            </div>
            <div className='row artist-discography'>
                <div className='container'>
                    <h4 className='text-white nopadding my-3'>Discography</h4>
                    <ArtistAlbums artistId={artistId}></ArtistAlbums>
                </div>
            </div>
            <div className='row artist-about mb-3'>
                <div className='container'>
                    <h4 className='text-white nopadding my-3'>About</h4>
                    <p className='text-white w-75'>{artists.desc}</p>
                </div>
            </div>
        </div>

    );
};

export default ArtistDetail;