import React, { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {useParams} from "react-router-dom";

import '../../css/InsertarExpedientes.css';
import configur from "../../env";

const { Option } = Select;

const env = configur.envDev ? configur.dev : configur.prod;
const baseUrl = env.api.base + env.api.ruta.expedientes;

function ExpedienteForm() {
    const [formData, setFormData] = useState({});
    const [isPrioritario, setIsPrioritario] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false); 
    const [expediente, setExpediente]= useState({});

    const params= useParams();

    const handlePrioritarioChange = (e) => {
        setIsPrioritario(e.target.checked);
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            //const values = await form.validateFields(); // Validar los campos del formulario

            const updateExpediente = {
                prioritario: values.prioritario,
                nombreexpediente: values.nombreexpediente,
                fechaentrada: values.fechaentrada,
                tipoexpediente: values.tipoexpediente,
                destino: values.destino,
                departamento: values.departamento,
                ubicacionarchivo: values.ubicacionarchivo,
                registro: values.registro,
                fecharegistro: values.fecharegistro,
                entidad: values.entidad,
                descripcion: values.descripcion,
                observaciones: values.observaciones,
            };

            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateExpediente),
            });

            if (response.ok) {
                console.log("Expediente insertado exitosamente");
                // Puedes realizar acciones adicionales aquí, como actualizar la lista de expedientes
                setIsPopupVisible(true);

                // Limpiar el formulario
                form.resetFields();

                setTimeout(() => {
                    setIsPopupVisible(false); // Ocultar el mensaje emergente después de un tiempo
                }, 3000); // Ocultar después de 3 segundos

            } else {
                console.error("Error al insertar expediente");
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const loadExpediente= async (id)=>{
        await fetch(baseUrl + `/${id}`)
            .then(response => response.json())
            .then(data => {
                setExpediente(data);
                console.log(data.nombreexpediente);
                setFormData(data);
                handleChange(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(()=>{
        loadExpediente(params.id);
    },[])

    const handleCancel = () => {
        form.resetFields();
        setIsPrioritario(false);
    };


    return (
        <Card className={"card"}>
            <div style={{ borderBottom: '4px solid #0e9390', marginBottom: '10px' }}></div>
            <div className="container">
                <div className="main-content">
                    <div className="form-container">
                        <form className={"form-item"} noValidate autoComplete="off">
                            <Checkbox
                                checked={isPrioritario}
                                onChange={handlePrioritarioChange}
                            >
                                MARCAR COMO PRIORITARIO
                            </Checkbox>
                            <TextField
                                label="NOMBRE DE EXPEDIENTE"
                                name="nombreexpediente"
                                value={formData.nombreexpediente || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="FECHA"
                                        name="fechaentrada"
                                        value={formData.fechaentrada || null}
                                        onChange={(date) => setFormData({ ...formData, fechaentrada: date })}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        label="TIPO DE EXPEDIENTE"
                                        name="tipoexpediente"
                                        value={formData.tipoexpediente || ''}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                    >
                                        <MenuItem value={1}>CARTA</MenuItem>
                                        <MenuItem value={2}>SOLICITUD</MenuItem>
                                        <MenuItem value={3}>LIBERAMIENTO DE PAGO</MenuItem>
                                        <MenuItem value={4}>RESOLUCION</MenuItem>
                                        <MenuItem value={5}>MANDAMIENTO</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Select
                                label="DESTINATARIO"
                                name="destino"
                                value={formData.destino || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                required
                            >
                                <MenuItem value={1}>Ceiba Intercontinental</MenuItem>
                                <MenuItem value={2}>Empresa Nacional de Gestión Inmobiliaria</MenuItem>
                                <MenuItem value={3}>Contabilidad Tesorería</MenuItem>
                                <MenuItem value={4}>Intervención Tesorería</MenuItem>
                                <MenuItem value={5}>Ministro Sección</MenuItem>
                            </Select>
                            <TextField
                                label="DEPARTAMENTO"
                                name="departamento"
                                value={formData.departamento || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <TextField
                                label="UBICACION DEL ARCHIVO"
                                name="ubicacionarchivo"
                                value={formData.ubicacionarchivo || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                        </form>
                    </div>
                    <div className="form-container">
                        <form className={"form-item"} noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="NUMERO DE REGISTRO"
                                        name="registro"
                                        value={formData.registro || ''}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="FECHA DE REGISTRO"
                                        name="fecharegistro"
                                        value={formData.fecharegistro || null}
                                        onChange={(date) => setFormData({ ...formData, fecharegistro: date })}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                                    />
                                </Grid>
                            </Grid>
                            <Select
                                label="ENTIDAD"
                                name="entidad"
                                value={formData.entidad || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                            >
                                <MenuItem value={1}>Ceiba Intercontinental</MenuItem>
                                <MenuItem value={2}>Empresa Nacional de Gestión Inmobiliaria</MenuItem>
                                <MenuItem value={3}>Contabilidad Tesorería</MenuItem>
                                <MenuItem value={4}>Intervención Tesorería</MenuItem>
                                <MenuItem value={5}>Ministro Sección</MenuItem>
                            </Select>
                            <TextField
                                label="DESCRIPCION"
                                name="descripcion"
                                value={formData.descripcion || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={5}
                            />
                            <TextField
                                label="OBSERVACIONES"
                                name="observaciones"
                                value={formData.observaciones || ''}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={5}
                            />
                        </form>
                    </div>
                </div>
                <div className="action">
                    <div className="adjunto">
                        <Input type="file" />
                    </div>
                    <div className="botones">
                        <Button className="button1" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button className="buttonGuardar" onClick={handleSave}>
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>
            {isPopupVisible && (
                <div className="popup">
                    <p>Expediente guardado exitosamente</p>
                </div>
            )}
        </Card>
    );
}

export default ExpedienteForm;
