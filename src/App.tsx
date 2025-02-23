import { useEffect, useState } from 'react'
import './App.css'
import Calender from './component/Calender'
import { Event } from './types/meeting'
import axios from 'axios'
import dayjs from 'dayjs'
import { EventInput } from '@fullcalendar/core/index.js'

function App() {

  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    const getMeeting = async () => {
      try {
        const response = await axios.get('/fixture/multipleMeeting.json')

        //mapping data according to time
        const grouped = groupMeetingsByTimeRange(response.data) as Event[][]

        //grouping data according to Event type
        const eventData = grouped.map((group) => {
          return {
            id: `${group[0].id}`,
            title: group[0].desc,
            start: group[0].start,
            end: group[0].end,
            overlap: true,
            extendedProps: {
              data: group
            }
            
          };
        })

        setEvents(eventData)
        
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getMeeting()
  }, [])


  //mapping data according to time
  const groupMeetingsByTimeRange = (meetings: Event[]): Event[][] => {

    const grouped = new Map();

    meetings?.forEach((meet) => {
      const start = dayjs(meet.start).format('YYYY-MM-DD HH:mm');
      const end = dayjs(meet.end).format('YYYY-MM-DD HH:mm');
      const key = `${start}-${end}`; // Create a unique key for each time range

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key).push(meet); // Add the meeting to the group
    });

    return Array.from(grouped.values());
  };

  return (
    <>
      <Calender meetings={events}/>
    </>
  )
}

export default App
