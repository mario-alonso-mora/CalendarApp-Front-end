

import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi';
import { OnChecking, OnLogOut, OnLogin, cleanErrorMessage } from '../store/auth/authSlice';
import { onLogOutCalendar } from '../store/calendar/calendarSlice';

export const useAuthStore = () => {


   const { status,user,errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();



    const startLogin = async({email,password}) =>{


        dispatch( OnChecking());

        try {
            
            const {data} = await calendarApi.post('/auth',{email,password});

            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime() );

            dispatch(OnLogin({ name:data.name,uid:data.uid }) );

          
             

            console.log({data})


        } catch (error) {

            dispatch(OnLogOut('Credentials Error') );

            setTimeout(() => {
                
                dispatch(cleanErrorMessage())

            }, 10);

            console.log(error)
            
        }

    }

    const startRegister = async({name,email,password}) =>{


        dispatch( OnChecking());

        try {
            
            const {data} = await calendarApi.post('/auth/new',{name,email,password});

            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime() );

            dispatch(OnLogin({ name:data.name,uid:data.uid}) );


        } catch (error) {

            dispatch(OnLogOut(error.response.data?.msg || 'Error in the Register'));

            setTimeout(() => {
                
                dispatch(cleanErrorMessage())

            }, 10);

            console.log(error)
            
        }


       

    }


    const cheackAuthToken = async() =>{

        const token = localStorage.getItem('token');

        if (!token) return dispatch( OnLogOut() );

        try {
            
            const {data} = await calendarApi.get('auth/renew');

            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime() );

            dispatch(OnLogin({ name:data.name,uid:data.uid}) );

        } catch (error) {

            localStorage.clear();

            dispatch(OnLogOut())
            
        }


    }

    const startLogOut = () =>{

        localStorage.clear();
        dispatch(OnLogOut());
        dispatch(onLogOutCalendar());

    }

    

  return {

    //!propiedades
        status,
        user,
        errorMessage,

    //!metodos

    startLogin,
    startRegister,
    cheackAuthToken,
    startLogOut,
  }
}
