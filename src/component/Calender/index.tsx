import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import Event from '../Event';
import { EventContentArg, EventInput } from '@fullcalendar/core/index.js';

type Props = {
    meetings: EventInput[];
}

const index = (Props: Props) => {
    const { meetings = [] } = Props
    
    return (
        <>
            <FullCalendar
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                select={(selectInfo) => console.log('select', selectInfo)}
                editable={true}
                eventStartEditable={true}

                views={{
                    dayGridMonth: {
                        buttonText: 'Month',
                        dayHeaderContent: (arg) => arg.date.toLocaleString('en-US', {weekday: 'long' }),
                        
                    },
                    timeGridWeek: {
                        buttonText: 'Week',
                        dayHeaderFormat: { day: 'numeric', weekday: 'short', month: 'short' },
                        slotDuration: '01:00:00', // Time slot duration (1 hour)
                        // slotMinTime: '10:00:00', // Start time of the calendar (8 AM)
                        // slotMaxTime: '18:00:00', // End time of the calendar (8 PM),
                        allDaySlot: false,
                        // slotEventOverlap: true,
                    },
                    timeGridDay: {
                        buttonText: 'Day',
                        dayHeaderFormat: { day: 'numeric', weekday: 'short', month: 'long' },
                        slotDuration: '01:00:00', // Time slot duration (1 hour)
                        // slotMinTime: '10:00:00', // Start time of the calendar (8 AM)
                        // slotMaxTime: '18:00:00', // End time of the calendar (8 PM),
                        allDaySlot: false
                    }
                }}
                dateClick={(arg) => console.log('dateClick', arg)}
                eventClick={(arg) => console.log('eventClick', arg)}
                eventContent={(arg: EventContentArg) => <Event {...arg} />}
                // events={[
                //     {
                //         title: 'Team Meeting',
                //         start: '2025-02-26T09:00:00',
                //         end: '2025-02-26T10:00:00',
                        
                //     },
                //     {
                //         title: 'Client Call',
                //         start: '2025-02-26T14:00:00',
                //         end: '2025-02-26T15:00:00',
                //     },
                //     {
                //         title: 'Workshop',
                //         start: '2025-02-27T11:00:00',
                //         end: '2025-02-27T13:00:00',
                //     },
                // ]}
                events={meetings}
                
            />
        </>
    )
}

export default index