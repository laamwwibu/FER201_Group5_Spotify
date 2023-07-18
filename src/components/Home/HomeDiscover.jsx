import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const HomeDiscover = () => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtist] = useState([]);

    const getArtistName = (artistId) => {
        const albumArtist = artists.find(artist => artist.id === artistId);
        return albumArtist ? albumArtist.name : '';
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        fetch('http://localhost:9999/albums')
            .then(response => response.json())
            .then(data => {
                // Shuffle the albums array
                const shuffledAlbums = shuffleArray(data);
                setAlbums(shuffledAlbums);
            });

        fetch('http://localhost:9999/artists')
            .then(response => response.json())
            .then(data => setArtist(data));
    }, []);

    return (
        <div className='home-genre'>
            <div className='row'>
                <div className='genre-title'>
                    <Link className='genre-name'>Discover new Music</Link>
                </div>
                {albums
                    .slice(0, 6)
                    .map(album => (
                        <div key={album.id} className='col-lg-4 col-md-6 col-sm-6 genre-albums'>
                            <Link to={`/album/${album.id}`}>
                                <Card className="genre-album-card my-2">
                                    <div className='row'>
                                        <CardImg className='col-lg-4 nopadding' src={album.albumCover} alt={album.name} style={{width: "100px", height: "100px"}} />
                                        <CardBody className='col-lg-7'>
                                            <CardTitle tag="h5">
                                                {album.name}
                                            </CardTitle>
                                            <CardText>
                                                <Link
                                                    className='text-decoration-none'
                                                    to={`/artist/${album.artistId}`}
                                                >{getArtistName(album.artistId)}</Link>
                                            </CardText>
                                        </CardBody>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default HomeDiscover;
