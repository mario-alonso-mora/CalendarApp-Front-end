import { Navbar } from "../components/Navbar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar} from 'react-big-calendar'
import { addHours } from "date-fns"
import { localizer } from "../../helpers/calendarLocalizer"
import { getMessages } from "../../helpers/getMessages"
import { CalendarEvent } from "../components/CalendarEvent"
import { useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { FabAddNew } from "../components/FabAddNew"
import { FabDelete } from "../components/FabDelete"
import { useEffect } from "react"
import { useAuthStore } from "../../hooks/useAuthStore"



export const CalendarPage = () => {

  const {user} = useAuthStore();
  const {openDateModal} = useUiStore();

  const {events,setActiveEvent,startLoadingEvents} = useCalendarStore();


  const [lastView, setLastWiew] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event,start,end,isSelected) =>{

    const isMyEvent = (user.uid === event.user._id) ||  (user.uid === event.user.uid);


    const style = {

      backgroundColor: isMyEvent ? '#74992e': '#465660',
      borderRadius:'0px',
      opacity:0.8,
      color:'black'
      
    }

    return {

      style
    }

  }

  const onDoubleClick = (event) =>{

    openDateModal();

  }

  const onSelect = (event) =>{

   setActiveEvent(event)

  }


  const onViewChanged = (event) =>{

    localStorage.setItem('lastView',event);

    setLastWiew(event)

  }

  useEffect(() => {
    
    startLoadingEvents();

  }, [])
  


  return (
    <>
    
    <Navbar/>

    <Calendar
      culture="es"
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height:'calc( 100vh - 80px)' }}
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{event: CalendarEvent}}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />

    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>

    </>
  )
}
