import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const HomeGenre = () => {
    const { genreName } = useParams();
    const [albums, setAlbums] = useState([]);
    const [artists, setArtist] = useState([]);
    const [genres, setGenres] = useState([]);

    const getArtistName = (artistId) => {
        const albumArtist = artists.find(artist => artist.id === artistId);
        return albumArtist ? albumArtist.name : '';
    };

    useEffect(() => {
        fetch('http://localhost:9999/albums')
            .then(response => response.json())
            .then(data => setAlbums(data))
        fetch('http://localhost:9999/artists')
            .then(response => response.json())
            .then(data => setArtist(data))
        fetch(`http://localhost:9999/genres?name=${genreName}`)
            .then(response => response.json())
            .then(data => setGenres(data))
        console.log(genres.name)
    }, [genreName])

    return (
        <div className='home-genre'>
            {genres.map(genre => (
                <div key={genre.id} className='row'>
                    <div className='genre-title d-flex justify-content-between align-items-center my-2'>
                        <Link className='genre-name'>{genre.name}</Link>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            {albums
                                .filter(album => album.genreId === genre.id)
                                .map(album => (
                                    <div key={album.id} className='col-lg-2 genre-albums'>
                                        <Link to={`/album/${album.id}`}>
                                            <Card className="genre-album-card my-2">
                                                <CardImg src={album.albumCover} alt={album.name} />
                                                <CardBody>
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
