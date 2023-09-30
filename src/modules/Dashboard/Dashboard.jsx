import React, { useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import '../../css/Dashboard.css';

const Dashboard = () => {

    const totalExpedientes = 150;
    const expedientesConfirmados = 80;
    const expedientesEnProceso = 50;
    const total = totalExpedientes + expedientesConfirmados + expedientesEnProceso;
    const porcentajeTotal = ((totalExpedientes / total) * 100).toFixed(2);
    const porcentajeConfirmados = ((expedientesConfirmados / total) * 100).toFixed(2);
    const porcentajeEnProceso = ((expedientesEnProceso / total) * 100).toFixed(2);

    return (
            <div className="dashboard">
                <Card className="card">
                    <div style={{ borderBottom: '4px solid #0e9390', marginBottom: '10px' }}></div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <div className="widget">
                                <Typography variant="h6" className="widget-title">
                                    Total Expedientes
                                </Typography>
                                <Typography variant="h4" className="widget-value" style={{ color: '#00a152' }}>
                                    {totalExpedientes}
                                </Typography>
                            </div>
                            <div className="widget-chart">
                                <div className="chart-color" style={{ backgroundColor: '#00a152', '--percentage': `${porcentajeTotal}%` }} />
                                <Typography variant="caption" className="chart-label">
                                    {porcentajeTotal}%
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="widget">
                                <Typography variant="h6" className="widget-title">
                                    Expedientes Confirmados
                                </Typography>
                                <Typography variant="h4" className="widget-value" style={{ color: '#0077b6' }}>
                                    {expedientesConfirmados}
                                </Typography>
                            </div>
                            <div className="widget-chart">
                                <div className="chart-color" style={{ backgroundColor: '#0077b6', '--percentage': `${porcentajeConfirmados}%` }} />
                                <Typography variant="caption" className="chart-label">
                                    {porcentajeConfirmados}%
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className="widget">
                                <Typography variant="h6" className="widget-title">
                                    Expedientes en Proceso
                                </Typography>
                                <Typography variant="h4" className="widget-value" style={{ color: '#f9c22e' }}>
                                    {expedientesEnProceso}
                                </Typography>
                            </div>
                            <div className="widget-chart">
                                <div className="chart-color" style={{ backgroundColor: '#f9c22e', '--percentage': `${porcentajeEnProceso}%` }} />
                                <Typography variant="caption" className="chart-label">
                                    {porcentajeEnProceso}%
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
    );
};

export default Dashboard;
