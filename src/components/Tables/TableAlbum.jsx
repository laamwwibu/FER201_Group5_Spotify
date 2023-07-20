import { useRef, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import PopUpDelete from './PopUpDelete';
import Board from './Board';

const buttonStyles1 = {
    width: '15%',
    height: '50px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    marginRight: '10px',
    color: 'black',
    fontSize: '1rem'

};

const columns = [
    { id: 'id', label: 'ID', minWidth: 170, align: 'center', },
    { id: 'name', label: 'Name', minWidth: 100, align: 'center', },
    {
        id: 'GenreName',
        label: 'GenreName',
        minWidth: 170,
        align: 'center',

    },
    {
        id: 'ArtistName',
        label: 'ArtistName',
        minWidth: 170,
        align: 'center',

    },
    {
        id: 'year',
        label: 'Year',
        minWidth: 170,
        align: 'center',

    },
    {
        id: 'albumCover',
        label: 'AlbumCover',
        minWidth: 170,
        align: 'center',

    },
    {
        id: 'feature',
        label: 'Feature',
        minWidth: 170,
        align: 'center',

    }

];




export default function TableAlbum() {
    const [storgeData, setStorgeData] = useState('');
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [rows, setRows] = useState([]);
    const [artist, setArtist] = useState([])
    const [genres, setGenres] = useState([])
    const [id, setId] = useState(0);
    const [index, setIndex] = useState(0);
    const [albumCover, setAlbumCover] = useState('')
    const [albumName, setAlbumName] = useState('');
    const [genreName, setGenreName] = useState(0);
    const [artisName, setArtisName] = useState(0);
    const [year, setYear] = useState(0);

    useEffect(() => {
        fetchData();

    }, [])
    async function fetchData() {
        try {
            const responseGenres = await fetch(`http://localHost:9999/genres`, {
                method: "GET",
                credentials: "include"
            });
            const dataGenres = await responseGenres.json();

            const responseArtists = await fetch(`http://localHost:9999/artists`, {
                method: "GET",
                credentials: "include"
            });
            const dataArtists = await responseArtists.json();

            const responseAlbums = await fetch(`http://localHost:9999/albums`, {
                method: "GET",
                credentials: "include"
            });
            const dataAlbums = await responseAlbums.json();

            // console.log(dataSongs);
            // console.log(dataAlbums);

            dataArtists.forEach(Artist => {
                dataAlbums.forEach((album, index) => {
                    if (album.artistId === Artist.id) {
                        dataAlbums[index] = {
                            ...album, ArtistName: Artist.name,
                        }
                    }
                });
            })

            dataGenres.forEach(Genres => {
                dataAlbums.forEach((album, index) => {
                    if (album.genreId === Genres.id) {
                        dataAlbums[index] = {
                            ...album, GenreName: Genres.name,
                        }
                    }
                });
            })
            console.log(dataAlbums)

            setGenres(dataGenres);
            setArtist(dataArtists);
            setRows(dataAlbums);
            setStorgeData(dataAlbums)

        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

    async function fetchUpdateData(postData) {
        try {
            const responseSongs = await fetch(`http://localHost:9999/albums/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(postData),
            });
            const data = await responseSongs.json();
            fetchData();
            handleCancelShow();
            console.log(data)
        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

    async function fetchCreateData(postData) {
        try {
            const responseSongs = await fetch(`http://localHost:9999/albums`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(postData),
            });
            const data = await responseSongs.json();
            fetchData();
            handleCancelShowCreate();
            console.log(data)
        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

  

    async function fetchDeleteSong(albumId) {
        try {
          const response = await fetch(`http://localhost:9999/songs`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ albumId:albumId }),
          });
          const data = await response.json();
          fetchData();
          console.log(data);
        } catch (error) {
          console.log('Lỗi:', error);
        }
      }
      

    async function fetchDeleteAlbum(parameter) {
        try {
            const response = await fetch(`http://localHost:9999/albums/${parameter}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await response.json();
            fetchData();
            console.log(data);

        } catch (error) {
            console.log('Lỗi:', error);
        }
    }



    const handleSearch = (e) => {
        console.log(e.target.value);
        const data1 = storgeData.filter(row => {
            // console.log(row.name)
            if (row.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                return row;
            }
        });
        console.log(data1)
        setSearch(e.target.value);
        setRows(data1);
    }

    const handleCancelShowCreate = () => {
        setGenreName(0);
        setArtisName(0);
        setYear(0);
        setAlbumName('');
        setAlbumCover('');
        setShowCreate(false);
    }

    const filterByArtist = (e) => {
        const artistId = e.target.value;
        // console.log(albumId);
        let newItem;
        if (artistId == 0) newItem = storgeData;
        else {
            newItem = storgeData.filter(album => album.artistId == artistId);
            // console.log(storgeData);
        }
        setRows(newItem)
    }


    const handleShow1 = (id,index) => {
        setShow1(true);
        setId(id);
        setIndex(index);
    }
    const handleCancelShow = () => {
        setGenreName(0);
        setArtisName(0);
        setYear(0);
        setAlbumName('');
        setAlbumCover('');
        setShow1(false);
    }

 

    const handleUpdate = () => {
        const postData = {
            id: parseInt(id),
            genreId:genreName?parseInt(genreName):storgeData[index].genreId,
            artistId:artisName?parseInt(artisName):storgeData[index].artistId,
            name:albumName?albumName:storgeData[index].name,
            year: year?year:storgeData[index].year,
            albumCover:albumCover?albumCover:storgeData[index].albumCover,
        };

        console.log(postData)
        fetchUpdateData(postData)

    }

    const handleCreate= () => {
        const postData = {
            genreId:genreName?parseInt(genreName):1,
            artistId:artisName?parseInt(artisName):1,
            name:albumName?albumName:"NaN",
            year: year?year:"NaN",
            albumCover:albumCover?albumCover:"NaN"
        };

        console.log(postData)
        fetchCreateData(postData)
       
    }

    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    const handleOnDelete = (state) => {
        fetchDeleteSong(id)
        fetchDeleteAlbum(id);
        setShow(state);
    }


    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#FFF',
                    borderRadius: '0.375rem',
                    padding: '10px 30px',
                    boxShadow: '0 1px 2px rgb(0 0 0 / 10%)',
                    borderLeft: '6px solid #FFD43B',
                    margin: '20px 0',
                }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }} >
                    Danh Sách Albums
                </Typography>

            </Box>
            <Box>
                <Box >
                    <Box sx={{ display: 'flex' }}>
                        <Button variant="contained" startIcon={<AddIcon sx={{ fontSize: '25px !important' }} />}
                            sx={{
                                ...buttonStyles1, backgroundColor: '#9DF99D', '&:hover': {
                                    backgroundColor: '#9DF99D',
                                }
                            }}
                            onClick={()=>setShowCreate(true)}
                        >Tạo mới Album</Button>

                        <Button variant="contained" startIcon={<DeleteIcon sx={{ fontSize: '25px !important' }} />}
                            sx={{
                                ...buttonStyles1, backgroundColor: '#D0D0D0', '&:hover': {
                                    backgroundColor: '#D0D0D0',
                                }
                            }}
                        >Xóa Tất cả</Button>
                    </Box>
                    <hr style={{ color: '#425771' }} />
                </Box>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                    <strong> Tìm kiếm tên Album:</strong>
                    <TextField
                        value={search}
                        onChange={handleSearch}
                        label="Tên Album" variant="outlined" sx={{ marginLeft: '10px', }} />
                </Box>
                <Box sx={{ width: '30%', display: 'flex' }}>
                    <select className="form-control"
                        onChange={filterByArtist}
                        style={{ marginBottom: 20, marginTop: '5%' }}
                    >
                        <option key='0' value="0">-- Chọn ca sĩ để lọc --</option>
                        {artist.map((artist) => (
                            <option key={artist.id} value={artist.id}>{artist.name}</option>
                        ))}
                    </select>
                </Box>
            </div>

            <Board handleShow={handleShow} handleShow1={handleShow1} rows={rows} columns={columns}
                img='albumCover'
            />
            {show && <PopUpDelete handleDelete={handleOnDelete} handleCancelDelete={(s) => setShow(s)} />}
            {show1 && <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "50%",
                    left: "50%",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    width: '20%',
                    height: '50%',
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    zIndex: '4',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                    Chỉnh sửa thông tin album
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '45%' }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            ID:
                        </Typography>
                        <TextField label="ID" value={id} readOnly sx={{ marginBottom: '10px' }} />
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            GenreName:
                        </Typography>
                        <select className="form-control"
                            onChange={(e) => setGenreName(e.target.value)}
                            style={{ marginBottom: 27, marginTop: '5%' }}
                        >
                            <option key='0' value="0">-- Chọn Genre --</option>
                            {genres.map((genres) => (
                                <option key={genres.id} value={genres.id}>{genres.name}</option>
                            ))}
                        </select>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            Name:
                        </Typography>
                        <TextField label="Name" variant="outlined" value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)} />
                    </div>
                    <div style={{ width: '45%' }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            Year:
                        </Typography>
                        <TextField label="Year" variant="outlined" value={year} sx={{ marginBottom: '10px' }}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            ArtistName:
                        </Typography>
                        <select className="form-control"
                            onChange={(e) => setArtisName(e.target.value)}
                            style={{ marginBottom: 27, marginTop: '5%' }}
                        >
                            <option key='0' value="0">-- Chọn Artist --</option>
                            {artist.map((artist) => (
                                <option key={artist.id} value={artist.id}>{artist.name}</option>
                            ))}
                        </select>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            AlbumCover:
                        </Typography>
                        <TextField label="Name" variant="outlined" value={albumCover}
                            onChange={(e) => setAlbumCover(e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button variant="contained" sx={{ marginRight: '10px' }} onClick={handleCancelShow}>Hủy Bỏ</Button>
                    <Button variant="contained" onClick={handleUpdate}>Đồng Ý</Button>
                </div>
            </Box>}
            {showCreate && <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "50%",
                    left: "50%",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    width: '20%',
                    height: '50%',
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    zIndex: '4',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                    Tạo album
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '45%' }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            GenreName:
                        </Typography>
                        <select className="form-control"
                            onChange={(e) => setGenreName(e.target.value)}
                            style={{ marginBottom: 27, marginTop: '5%' }}
                        >
                            <option key='0' value="0">-- Chọn Genre --</option>
                            {genres.map((genres) => (
                                <option key={genres.id} value={genres.id}>{genres.name}</option>
                            ))}
                        </select>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            Name:
                        </Typography>
                        <TextField label="Name" variant="outlined" value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)} />
                    </div>
                    <div style={{ width: '45%' }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            Year:
                        </Typography>
                        <TextField label="Year" variant="outlined" value={year} sx={{ marginBottom: '10px' }}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            ArtistName:
                        </Typography>
                        <select className="form-control"
                            onChange={(e) => setArtisName(e.target.value)}
                            style={{ marginBottom: 27, marginTop: '5%' }}
                        >
                            <option key='0' value="0">-- Chọn Artist --</option>
                            {artist.map((artist) => (
                                <option key={artist.id} value={artist.id}>{artist.name}</option>
                            ))}
                        </select>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
                            AlbumCover:
                        </Typography>
                        <TextField label="Name" variant="outlined" value={albumCover}
                            onChange={(e) => setAlbumCover(e.target.value)} />
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button variant="contained" sx={{ marginRight: '10px' }} onClick={handleCancelShowCreate}>Hủy Bỏ</Button>
                    <Button variant="contained" onClick={handleCreate}>Đồng Ý</Button>
                </div>
            </Box>}
        </>
    );
}
