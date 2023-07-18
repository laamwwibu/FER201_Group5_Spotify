import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';

const HomeArtist = () => {
    const [artists, setArtist] = useState([]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        fetch('http://localhost:9999/artists')
            .then(response => response.json())
            .then(data => {
                const shuffledAlbums = shuffleArray(data);
                setArtist(shuffledAlbums)
            })
    }, [])

    return (
        <div className='home-genre'>
            <div className='row'>
                <div className='genre-title d-flex justify-content-between align-items-center my-2'>
                    <Link to={`/artists/`} className='genre-name'>Artist</Link>
                    <Link to={`/artists/`} className='genre-show-all'>Show all</Link>
                </div>
                <div className='container'>
                    <div className='row'>
                        {artists
                            .slice(0, 6)
                            .map(artist => (
                                <div key={artist.id} className='col-lg-2 col-md-4 col-sm-6 genre-albums'>
                                    <Link to={`/artist/${artist.id}`}>
                                        <Card className="genre-album-card artist-card my-2">
                                            <CardImg className='circle img-fluid' src={artist.img} alt={artist.name} />
                                            <CardBody className='nopadding'>
                                                <CardTitle tag="h5">
                                                    {artist.name}
                                                </CardTitle>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeArtist;
