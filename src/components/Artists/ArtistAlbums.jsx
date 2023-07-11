import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const ArtistAlbums = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtist] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/albums?artistId=${artistId}`)
      .then(response => response.json())
      .then(data => setAlbums(data));
    fetch(`http://localhost:9999/artists/${artistId}`)
      .then(response => response.json())
      .then(data => setArtist(data))
  }, [artistId]);

  return (
    <div>
      <div className='genre-title d-flex justify-content-between align-items-center my-2'>
        <Link to={`/artist/${artistId}`} className='genre-name'>More By {artists.name}</Link>
        <Link to={`/artist/${artistId}`} className='genre-show-all'>Show all</Link>
      </div>
      <div className='container-fluid nopadding'>
        <div className='row'>
          {albums.map(album => (
            <div key={album.id} className='col-lg-2 genre-albums'>
              <Link to={`/album/${album.id}`}>
                <Card className="genre-album-card my-2">
                  <CardImg src={album.albumCover} alt={album.name} />
                  <CardBody>
                    <CardTitle tag="h5">
                      {album.name}
                    </CardTitle>
                    <CardText>
                      <Link to={`/artist/${artistId}`}>{album.year}</Link>
                    </CardText>
                  </CardBody>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistAlbums;