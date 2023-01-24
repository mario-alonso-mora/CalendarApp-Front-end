import { createSlice } from "@reduxjs/toolkit";



export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents:true,
    events:[
      
    ],
    activeEvent: null,
  },
  reducers: {

    OnSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    OnAddNewEvent : (state , {payload}) => {

      state.events.push(payload);
      state.activeEvent = null;

    },

    OnUpdateEvent : (state , {payload}) => {

      state.events = state.events.map( event =>{

        if(event.id === payload.id){

          return payload

        }

        return event
      });
      
    },

    OnDeleteEvent : (state) =>{

      if (state.activeEvent) {
        
        state.events = state.events.filter( event => event.id !== state.activeEvent.id);
        state.activeEvent = null;

      }
      

    },

    onLoadEvents: (state, { payload = []}) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach( event => {
          const exists = state.events.some( dbEvent => dbEvent.id === event.id );
          if ( !exists ) {
              state.events.push( event )
          }
      })
  },


  onLogOutCalendar: (state) => {
    state.isLoadingEvents = false;
    state.events = [];
    state.activeEvent = null;

    
},


  },
});

// Action creators are generated for each case reducer function
export const { OnSetActiveEvent,OnAddNewEvent,OnUpdateEvent,OnDeleteEvent,onLoadEvents,onLogOutCalendar } = calendarSlice.actions;
