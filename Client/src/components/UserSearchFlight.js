import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlightIcon from '@mui/icons-material/Flight';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import LuggageIcon from '@mui/icons-material/Luggage';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SeatParent from './SeatParent';
import axios from 'axios';
// "https://media.istockphoto.com/photos/commercial-jet-flying-over-clouds-picture-id155380716?b=1&k=20&m=155380716&s=170667a&w=0&h=LjalFiyrKtBye-26dufNMHkbU_k_KrJ1-UYnbTpaxtM="

const UserSearchFlight = (props) => {
  const [open , setOpen] = React.useState( false );
  const [ seats , setSeats] = React.useState('');

  const durationTime = () => {
    const diffTime = Math.abs( new Date((props.arrivalDate)).getTime() - new Date((props.departureDate)).getTime() );
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60 )); 
    return diffHours ;
  };

  const handleReservation = (selected) => {
    console.log(props._id);
    console.log(selected);
    console.log( (props.Class === 'business')? props.businessSeatPrice : props.economicSeatPrice );
    props.setId( props._id );
    props.setSeats( selected );
    props.setPrice( (props.Class === 'business')? props.businessSeatPrice : props.economicSeatPrice );
  };

    return (  
      <>
        <div className="mx-32 mb-6 w-5/6">
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <img className="rounded-full w-36 h-16 h-16 mr-5" src={props.dep_img_url} />
            <div className=" w-full justify-center">
            <div className=" flex justify-between justify-items-center">
                  <Typography  variant="h4">
                  {(props.departureDate).substring(11, 16)}
            </Typography>
             <SendIcon sx={{fontSize:40}}/>             
            <Typography  variant="h4">
                  {(props.arrivalDate).substring(11, 16)}
            </Typography>     
            </div>

            <div className=" flex justify-between justify-items-center mb-6">
            <Typography gutterBottom variant="body1" color="text.secondary">
            {props.departureAirportTerminal}
            </Typography>
            <Typography gutterBottom variant="caption" color="text.secondary">
            { durationTime() + " hours"}
            </Typography>
            <Typography gutterBottom variant="body1" color="text.secondary">
            {props.arrivalAirportTerminal}
            </Typography>
            </div>
            </div>
            <img className="rounded-full w-36 h-16 h-16 ml-5" src={props.arr_img_url} />
        </AccordionSummary>
        
        <AccordionDetails>
            <div>
            <Typography sx={{marginBottom: 2}}>
            <FlightIcon /> { props.flightNumber }
          </Typography>
        <div className="flex justify-evenly">
          <Typography>
          <EventIcon/> {(props.departureDate).substring(0, 10)}
          </Typography>
           <Typography>
          <ClassRoundedIcon /> { (props.Class) }
          </Typography>
          </div>
          <div className="flex justify-evenly">
          <Typography>
          <EventIcon/> {(props.arrivalDate).substring(0, 10)}
          </Typography>
          <Typography>
          <AttachMoneyIcon/> { (props.Class === 'business')? props.businessSeatPrice : props.economicSeatPrice }
          </Typography>
          </div>
          <Typography>
          <LuggageIcon /> { (props.Class === 'business')? "2*32KG" : "1*23KG" }
          </Typography>
          <div className="flex justify-end">
          <Button onClick={() => { setOpen(true) }} variant="contained" startIcon={<EventSeatIcon />} size="large">Reserve</Button>
          </div>
          </div>
        </AccordionDetails>
      </Accordion>
        </div>

        <SeatParent
        // 
        open={open}
        maxNumber = { props.maxNumber }
        // console.log(boolean);
        close={ (boolean ) => {  setOpen(boolean);} }
        sendSeats = { (selected) => { handleReservation(selected); console.log(selected); } } 
        flightNumber = { props._id }
        Class = { props.Class }
         
        />

        </>
    )
}

export default UserSearchFlight
