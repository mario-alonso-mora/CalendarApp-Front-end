

export const CalendarEvent = ({event}) => {

    const {title,user,notes} = event;



  return (
    <>
      <code>{user.name}</code>
      <br />

    <strong>{title}</strong>
     <span> -{notes}</span>
   
    
    
    </>
  )
}
