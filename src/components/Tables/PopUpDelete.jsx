import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const PopUpDelete = ({handleDelete,handleCancelDelete}) => {
    return (
        <>
           <Box
                sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "50%",
                    left: "50%",
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    width: '20%',
                    height: '20%',
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    zIndex: '4',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Typography variant='h4' sx={{ fontWeight: 'bold' }} >
                    Cảnh báo
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }} >
                    Bạn có chắc chắn là muốn xóa?
                </Typography>
                <div style={{ marginTop: '10px' }}>
                    <Button variant="contained" sx={{ marginRight: '10px' }} onClick={()=>handleCancelDelete(false)}>Hủy Bỏ</Button>
                    <Button variant="contained" onClick={()=>handleDelete(false)} >Đồng Ý</Button>
                </div>

            </Box>
        </>
    );
}

export default PopUpDelete;