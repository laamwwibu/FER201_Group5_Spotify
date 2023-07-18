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
  marginRight:'10px',
  color:'black',
  fontSize:'1rem'

};

const columns = [
  { id: 'id', label: 'ID', minWidth: 170, align: 'center', },
  { id: 'name', label: 'Tên Tài Khoản', minWidth: 170, align: 'center', },
  { id: 'name', label: 'Họ Và Tên', minWidth: 170, align: 'center', },
  {
    id: 'img',
    label: 'Hình  Ảnh',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng Thái',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'changeStatus',
    label: 'Thay Đổi Trạng Thái',
    minWidth: 400,
    align: 'center',
  }

];




export default function TableUser() {
  const [storgeData, setStorgeData] = useState('');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [rows, setRows] = useState([]);
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [id, setId] = useState(0);
  const [songName, setSongName] = useState('');
  const [albumName, setAlbumName] = useState(0);
  const [duration, setDuation] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchData();

  }, [])
  async function fetchData() {
    try {
      const response = await fetch(`http://localHost:9999/users`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();     
      console.log(data)

      const users = data.filter(user => user.role !== 'admin');
      setRows(users);
      setStorgeData(users);

    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  async function fetchUpdateData(postData,id1) {
    try {
      const responseSongs = await fetch(`http://localHost:9999/users/${id1}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });
      const data = await responseSongs.json();
      fetchData();
      console.log(data);
      handleCancelShow();
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }

  



  const handleSearch = (e) => {
    console.log(e.target.value);
    const data1 = storgeData.filter(row => {
      if (row.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return row;
      }
    });
    console.log(data1)
    setSearch(e.target.value);
    setRows(data1);
  }


  
  const handleShow1 = (id,index) => {
    setShow1(true);
    setId(id);
    setIndex(index);
}
  const handleCancelShow = () => {
    setSongName('');
    setAlbumName(0);
    setDuation('');
    setShow1(false);
  }

  const handleUpdate = () => {
    const postData = {
      id: parseInt(id),
      albumId:albumName?parseInt(albumName):storgeData[index].albumId,
      name: songName?songName:storgeData[index].name,
      duration: duration?duration:storgeData[index].duration,
    };

    console.log(postData)
    fetchUpdateData(postData)
    
    
  }

  const handleShow = (id) => {
    setShow(true);
    setId(id);
  }
  
  const handleOnDelete = (state) => {
    // fetchDeleteSong(id);
    setShow(state);

  }

  const handleChangeStatus=(id,index,e)=>{
        console.log('oke:'+e);
        storgeData[index].status=e; 
        fetchUpdateData(storgeData[index],id);   

                    
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
          Danh Sách Tài Khoản
        </Typography>

      </Box>
      
      <div style={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <strong> Tìm kiếm tên Khách Hàng:</strong>
          <TextField
            value={search}
            onChange={handleSearch}
            label="Tên Khách Hàng" variant="outlined" sx={{ marginLeft: '10px', }} />
        </Box>
    
      </div>

      <Board handleShow={handleShow} handleShow1={handleShow1} rows={rows} columns={columns} img='img'
        handleChangeStatus={handleChangeStatus}
      />
      {show && <PopUpDelete handleDelete={handleOnDelete} handleCancelDelete={(s)=>setShow(s)}  />}
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
          height: '40%',
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
          Chỉnh sửa thông tin bài hát
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '45%' }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
              ID:
            </Typography>
            <TextField label="ID" value={id} readOnly sx={{ marginBottom: '10px' }} />
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
              Name:
            </Typography>
            <TextField label="Name" variant="outlined" value={songName}
              onChange={(e) => setSongName(e.target.value)} />
          </div>
          <div style={{ width: '45%' }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
              AlbumName:
            </Typography>
            <select className="form-control"
              onChange={(e) => setAlbumName(e.target.value)}
              style={{ marginBottom: 27, marginTop: '5%' }}
            >
              <option key='0' value="0">-- Chọn album --</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>{album.name}</option>
              ))}
            </select>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', marginBottom: '10px' }} >
              Duration:
            </Typography>
            <TextField label="Duration" variant="outlined" value={duration}
              onChange={(e) => setDuation(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" sx={{ marginRight: '10px' }} onClick={handleCancelShow}>Hủy Bỏ</Button>
          <Button variant="contained" onClick={handleUpdate}>Đồng Ý</Button>
        </div>
      </Box>}
    </>
  );
}
