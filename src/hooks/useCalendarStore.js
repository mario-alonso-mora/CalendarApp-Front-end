import { useDispatch, useSelector } from "react-redux"
import { OnAddNewEvent, OnDeleteEvent, OnSetActiveEvent, OnUpdateEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";




export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events,activeEvent} = useSelector(state => state.calendar);
   

    const { user } = useSelector( state => state.auth );




    const setActiveEvent = (calendarEvent) =>{

        dispatch(OnSetActiveEvent(calendarEvent))
    }

    const startDeletingEvent = async() =>{


        try {
         
                
                await calendarApi.delete(`/events/${activeEvent.id}`);
                dispatch( OnDeleteEvent() );
                
        } catch (error) {
            console.log(error);
            Swal.fire('Error to delete event', error.response.data.msg, 'error');
        }

    }
    



    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( OnUpdateEvent({ ...calendarEvent, user }) );
                return;
            } 
    
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( OnAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error to save', error.response.data.msg, 'error');
        }

       
        
    }



    const startLoadingEvents = async() =>{

        try {
            
            const {data} = await calendarApi.get('/events');

            const events = convertEventsToDateEvents(data.events);

            dispatch(onLoadEvents(events));

            


        } catch (error) {
            
            console.log('error al cargar los eventos')
            console.log(error);

        }


    }
    

    return {

        //*propiedades
            events,
            activeEvent,
            hasEventSelected: !!activeEvent,
        


        //*metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
       
    }
  
}
