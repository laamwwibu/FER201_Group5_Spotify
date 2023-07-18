import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSong from '../Tables/TableSong';
import TableAlbum from '../Tables/TableAlbum';
import TableUser from '../Tables/TableUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const buttonStyles = {
    width: '100%',
    height: '50px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15%',
    justifyContent: 'flex-start',
};

export default function HomeAdmin() {
    return (

        <>
            <header class="app-header" style={{
                display: 'flex', justifyContent: 'flex-end', height: '50px',
                backgroundColor: '#001C40'
            }}>
                <Box sx={{
                    width: '2.5%', backgroundColor: '#C7AB3B', marginRight: '5%', display: 'flex',
                    justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                }}>
                    <LogoutIcon sx={{ fontSize: '2rem', color: 'white' }} />
                </Box>


            </header>

            <Grid container spacing={10} sx={{ height: '100%' }}>
                <Grid xs={6} md={2} sx={{
                    backgroundColor: '#001C40', padding: '20px', height: '100%',
                    position: 'fixed', top: '0px', left: '0px'
                }}>
                    <aside class="app-sidebar" style={{ height: '100%' }} >
                        <div class="app-sidebar__user" style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', color: 'white'
                        }}>
                            <img class="app-sidebar__user-avatar"
                                src="https://i.scdn.co/image/ab6761610000e5eb35ca7d2181258b51c0f2cf9e" width="50px"
                                alt="User Image"
                                style={{ width: '100px', height: '100px', border: '3px solid white', marginBottom: '10px', borderRadius: '50%' }}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <p class="app-sidebar__user-name"><b>Võ Trường</b></p>
                                <p class="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
                            </div>
                        </div>
                        <hr style={{ color: '#425771' }} />
                        <Box class="app-menu">
                            <Button variant="contained" startIcon={<RecordVoiceOverIcon sx={{ fontSize: '25px' }} />}
                                sx={buttonStyles}
                            >Quản lý Khách hàng</Button>
                            <Button variant="contained" startIcon={<AlbumIcon sx={{ fontSize: '25px' }} />}
                                sx={buttonStyles}
                            >Quản lý Album</Button>
                            <Button variant="contained" startIcon={<MusicNoteIcon sx={{ fontSize: '25px' }} />}
                                sx={buttonStyles}
                            >Quản lý bài hát</Button>
                        </Box>
                    </aside>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={6} md={10}>
                    
                    <TableUser />
                    {/* <Item>xs=4</Item> */}
                </Grid>

            </Grid>
        </>
    );
}