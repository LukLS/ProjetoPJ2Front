import React, { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography } from "@mui/material";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        // Buscar processos do backend
        fetch('http://localhost:8080/api/processo')
            .then(response => response.json())
            .then(data => {
                const eventsData = data.map(processo => ({
                    title: processo.titulo,
                    date: processo.prazo,
                }));
                setEvents(eventsData);
            })
            .catch(error => console.error('Erro ao buscar processos:', error));
    }, []);

    const handleDateChange = (newDate) => {
        // Atualiza a data selecionada
        setSelectedDate(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100vh', padding: 2 }}>
                {/* Calendário grande */}
                <Box sx={{ width: '65%', backgroundColor: '#f0f0f0', padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Calendário Grande
                    </Typography>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        initialDate={selectedDate.toDate()}
                        headerToolbar={false} // Remove a navegação de mês do FullCalendar
                        key={selectedDate} 
                    />
                </Box>

                {/* Calendário pequeno */}
                <Box sx={{ width: '35%', backgroundColor: '#ffffff', padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Selecionar Data
                    </Typography>
                    <DateCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        views={['year', 'month']}
                        openTo="month"
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default Home;
