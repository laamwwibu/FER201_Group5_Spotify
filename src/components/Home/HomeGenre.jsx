import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const HomeGenre = () => {
    const [genres, setGenre] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtist] = useState([]);

    const getArtistName = (artistId) => {
        const albumArtist = artists.find(artist => artist.id === artistId);
        return albumArtist ? albumArtist.name : '';
    };

    useEffect(() => {
        fetch('http://localhost:9999/genres')
            .then(response => response.json())
            .then(data => setGenre(data))

        fetch('http://localhost:9999/albums')
            .then(response => response.json())
            .then(data => setAlbums(data))
        fetch('http://localhost:9999/artists')
            .then(response => response.json())
            .then(data => setArtist(data))
    }, [])

    return (
        <div className='home-genre'>
            {genres.map(genre => (
                <div key={genre.id} className='row'>
                    <div className='genre-title d-flex justify-content-between align-items-center my-2'>
                        <Link to={`/genres/${genre.name}`} className='genre-name'>{genre.name}</Link>
                        <Link to={`/genres/${genre.name}`} className='genre-show-all'>Show all</Link>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            {albums
                                .filter(album => album.genreId === genre.id)
                                .slice(0, 6)
                                .map(album => (
                                    <div key={album.id} className='col-lg-2 col-md-4 col-sm-6 genre-albums'>
                                        <Link to={`/album/${album.id}`}>
                                            <Card className="genre-album-card my-2">
                                                <CardImg className='img-fluid' src={album.albumCover} alt={album.name} />
                                                <CardBody className='nopadding'>
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
                                            </Card>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default HomeGenre;
