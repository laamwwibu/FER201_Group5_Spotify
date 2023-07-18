import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';

const iconStyle = {
    padding: '5px',
    width: '40px',
    height: '40px',
    borderRadius: '5px',
    marginRight: '10px',
    cursor: 'pointer'
}

const Board = ({ handleShow, handleShow1, rows, columns, img,handleChangeStatus }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                console.log(row.status)
                                return (
                                    <>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                // console.log('column:'+column.id);
                                                // console.log('column1:'+column.id !== 'albumCover');
                                                // console.log('row:'+value);
                                                if (column.id !== img) {
                                                    if (column.id === 'status') {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>

                                                                <Brightness1Icon sx={row.status==='Kích Hoạt'?{
                                                                    color: 'green'
                                                                }:{
                                                                    color: 'Gray'
                                                                }} /> {value}

                                                            </TableCell>
                                                        );
                                                    }else if (column.id === 'changeStatus') {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <RadioGroup
                                                                    sx={{justifyContent: 'center'}}
                                                                    row
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"
                                                                    value={row.status}
                                                                    onChange={(e)=>handleChangeStatus(row.id,index,e.target.value)}
                                                                >
                                                                    <FormControlLabel value="Kích Hoạt" control={<Radio />} label="Kích hoạt" />
                                                                    <FormControlLabel value="Hủy Kích Hoạt" control={<Radio />} label="Hủy kích hoạt" />
                                                                </RadioGroup>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {value ? (
                                                                    value
                                                                ) : (
                                                                    <Box>
                                                                        <DeleteIcon
                                                                            sx={{
                                                                                ...iconStyle,
                                                                                backgroundColor: '#F7C3C2',
                                                                                color: '#de0400'
                                                                            }}
                                                                            onClick={() => handleShow(row.id)}
                                                                        />
                                                                        <EditIcon
                                                                            sx={{
                                                                                ...iconStyle,
                                                                                backgroundColor: '#FBE2C5',
                                                                                color: 'rgb(245 157 57)'
                                                                            }}
                                                                            onClick={() => handleShow1(row.id, index)}
                                                                        />
                                                                    </Box>
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>

                                                            <img src={value} alt="Image" style={{ width: '20%', height: '20%' }} />

                                                            {/* <Avatar src={value} sx={{ width: '20%', height: '20%',
                                                                 }} /> */}
                                                        </TableCell>
                                                    );
                                                }
                                            })}

                                        </TableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );
}

export default Board;