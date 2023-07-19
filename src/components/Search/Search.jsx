import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const SearchFeature = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ artists: [], albums: [], songs: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let delayTimer;

        if (searchTerm) {
            setIsLoading(true);
            delayTimer = setTimeout(() => {
                fetchData();
            }, 1000); // Delay of 1 second before making the search request
        } else {
            setSearchResults({ artists: [], albums: [], songs: [] });
        }

        return () => clearTimeout(delayTimer); // Clear the timeout on component unmount or when searchTerm changes
    }, [searchTerm]);

    const fetchData = async () => {
        try {
            const responseArtists = await fetch(`http://localhost:9999/artists`);
            const responseAlbums = await fetch(`http://localhost:9999/albums`);
            const responseSongs = await fetch(`http://localhost:9999/songs`);

            if (!responseArtists.ok || !responseAlbums.ok || !responseSongs.ok) {
                throw new Error('Network response was not ok.');
            }

            const artists = await responseArtists.json();
            const albums = await responseAlbums.json();
            const songs = await responseSongs.json();

            // Filter artists, albums, and songs based on the search term
            const filteredArtists = artists.filter((artist) =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );
            const filteredAlbums = albums.filter((album) =>
                album.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );
            const filteredSongs = songs.filter((song) =>
                song.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );

            setSearchResults({ artists: filteredArtists, albums: filteredAlbums, songs: filteredSongs });
            setIsLoading(false); // Set isLoading to false once the API calls are complete
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set isLoading to false in case of an error
            // Handle error state here
        }
    };

    const getArtistName = (album) => {
        const artist = searchResults.artists.find((artist) => artist.id === album.artistId);
        return artist ? artist.name : 'Unknown Artist';
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className='form-control w-50 my-2'
                value={searchTerm}
                onChange={handleSearch}
            />

            {/* Display loading state */}
            {!searchTerm && isLoading && <p className='spinner-border text-success'></p>}

            {/* Display search results */}
            {searchTerm && !isLoading && (
                <>
                    {searchResults.artists.length > 0 && (
                        <div>
                            <h2 className='text-white'>Albums:</h2>
                            <div className='row'>
                                {searchResults.artists.map((artist) => (
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
                    )}

                    {searchResults.albums.length > 0 && (
                        <div>
                            <h2 className='text-white'>Albums:</h2>
                            <div className='row'>
                                {searchResults.albums.map((album) => (
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
                    )}

                    {searchResults.songs.length > 0 && (
                        <div>
                            <h2 className='text-white'>Songs:</h2>
                            {searchResults.songs.map((song) => (
                                <div key={song.id}>
                                    <h3>{song.name}</h3>
                                    {/* Display other song details here */}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchFeature;
