import React, { useState, useEffect } from 'react';
import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent, TextField, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VerIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Checkbox from '@mui/material/Checkbox';
import "../../css/Expediente.css";
import configur from "../../env";

const itemsPerPage = 7;

const env = configur.envDev ? configur.dev : configur.prod;
const baseUrl = env.api.base + env.api.ruta.expedientes;

const ExpedienteTable = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [expedientes, setExpedientes] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State para controlar la visibilidad del popup
    const [open, setOpen] = useState(false);
    const [deleteExp, setDeleteExp] = useState(false);
    const [expedienteId, setExpedienteId] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                setExpedientes(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [deleteExp]); 

    const handleDelete = async (id) => {
        setExpedienteId(id);
        setOpen(true);
    };

    const confirmDelete = async (id) => {
        setOpen(false);

        try {
            await fetch(baseUrl + `/${id}`, {
                method: "DELETE",
            });
            setDeleteExp(!deleteExp);
            setIsPopupVisible(true);

            setTimeout(() => {
                setIsPopupVisible(false);
                console.log(expedientes);
            }, 3000); 
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const filteredExpedientes = expedientes.filter((expediente) =>
        expediente.nombreexpediente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedExpedientes = filteredExpedientes.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Card variant="outlined">
            <div
                style={{ borderBottom: "4px solid #0e9390", marginBottom: "10px" }}
            ></div>
            <CardContent>

                <TextField
                    label="Buscar expediente"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "#0e9390" }} />
                            </InputAdornment>
                        ),
                        style: { color: "#0e9390" },
                    }}
                    style={{ marginBottom: "10px" }}
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className="tablecell">
                            <TableRow>
                                <TableCell align={"center"} style={{ color: "#0e9390" }}>PRIORITARIO</TableCell>
                                <TableCell align={"center"} style={{ color: "#0e9390" }}>FECHA</TableCell>
                                <TableCell style={{ color: "#0e9390" }}>NÚMERO DE EXPEDIENTE</TableCell>
                                <TableCell style={{ color: "#0e9390" }}>NOMBRE DE EXPEDIENTE</TableCell>
                                <TableCell style={{ color: "#0e9390" }}>UBICACIÓN DEL ARCHIVO</TableCell>
                                <TableCell style={{ color: "#0e9390" }}>ENTIDAD</TableCell>
                                <TableCell align={"center"} style={{ color: "#0e9390" }}>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedExpedientes.map((expediente, index) => (
                                <TableRow key={index}>
                                    <TableCell style={{ textAlign: "center" }}><Checkbox defaultChecked={expediente.prioritario} disabled></Checkbox></TableCell>
                                    <TableCell>{expediente.fechaentrada}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{expediente.idexpediente}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{expediente.nombreexpediente}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{expediente.descripcion}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{expediente.entidad}</TableCell>
                                    <TableCell>
                                        <div className="actions">
                                            <Button
                                                variant="text"
                                                startIcon={<VerIcon />}
                                                color="primary"
                                            >
                                            </Button>
                                            <Button
                                                variant="text"
                                                startIcon={<EditIcon />}
                                                color="primary"
                                            >
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(expediente.idexpediente)}
                                                variant="text"
                                                startIcon={<DeleteIcon />}
                                                color="secondary"
                                            >
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "16px",
                    }}
                >
                    <Pagination
                        count={Math.ceil(filteredExpedientes.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </div>
            </CardContent>
            {isPopupVisible && (
                <div className="popup">
                    <p>Expediente eliminado exitosamente</p>
                </div>
            )}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', border: '2px solid #000' }}>
                        <h2 id="simple-modal-title">¿Estás seguro que quieres eliminar el expediente?</h2>
                        <Button onClick={() => confirmDelete(expedienteId)}>Eliminar</Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </div>
                </Modal>
            </div>
        </Card>
    );
};

export default ExpedienteTable;
