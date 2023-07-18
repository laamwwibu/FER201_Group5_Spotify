import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ArtistAlbums from '../Artists/ArtistAlbums';
import MoreByArtist from '../MoreByArtist';

const AlbumDetail = () => {
    const { albumId } = useParams();
    console.log(albumId)
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/albums/${albumId}`)
            .then(response => response.json())
            .then(data => {
                setAlbum(data);
                fetch(`http://localhost:9999/artists/${data.artistId}`)
                    .then(response => response.json())
                    .then(artistData => setArtist(artistData));
            });

        fetch(`http://localhost:9999/songs?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => setSongs(data));
    }, [albumId]);

    const getAlbumDuration = (songs) => {
        let totalDuration = 0;
        songs.forEach((song) => {
            const songDurationInSeconds = convertDurationSenconds(song.duration);
            totalDuration += songDurationInSeconds;
        });
        return totalDuration;
    };

    const convertDurationSenconds = (duration) => {
        var [hours, minutes, seconds] = duration.split(":");
        return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
    }

    const formatTimeUnit = (unit) => {
        return unit.toString().padStart(2, "0");
    };

    const formatAlbumDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        var formattedDuration = '';

        if (hours > 0) {
            formattedDuration += formatTimeUnit(hours) + " hours ";
        }
        formattedDuration += formatTimeUnit(minutes) + " min ";
        formattedDuration += formatTimeUnit(seconds) + " sec";

        return formattedDuration;
    };

    const albumDurationInSeconds = getAlbumDuration(songs);
    const albumDuration = formatAlbumDuration(albumDurationInSeconds);

    if (!album || !artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container-fluid'>
            <div className='album-info d-flex align-items-end'>
                {album.albumCover && <img src={album.albumCover} alt={album.name} />}
                <div className='album-info-body mx-3'>
                    <h1>{album.name}</h1>
                    <div className='album-info-body-detail d-flex align-items-center'>
                        {artist.img && <img id='album-info-body-detail-image' src={artist.img} alt='' />}
                        <Link to={`/artist/${album.artistId}`} className='nopadding'>{artist.name}</Link>
                        <p>&#x2022;</p>
                        <p className='nopadding'>{album.year}</p>
                        <p>&#x2022;</p>
                        <p className='nopadding'>
                            {songs.length} songs, {albumDuration}
                        </p>
                    </div>
                </div>
            </div>

            <div className='album-songs my-3'>
                <table className='table song-table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Title</th>
                            <th scope='col'><FontAwesomeIcon icon={faClock} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (
                            <tr key={song.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{song.name}</td>
                                <td>{song.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <MoreByArtist artistId={artist.id}></MoreByArtist>
            <ArtistAlbums artistId={artist.id}></ArtistAlbums>
        </div>
    );
};

export default AlbumDetail;
