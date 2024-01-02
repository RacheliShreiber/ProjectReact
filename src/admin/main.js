import { Link, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import BusinessDetails from './businessDetails';
import storeBusiness from '../store/business'
import Login from './login';

const Main=observer(() =>{
  if (!storeBusiness.isAdmin) {
    return (
      <>
      <Login></Login>    
      </>
    )
  }
  else {
    return (
      <>
        <BusinessDetails></BusinessDetails>
        <Link to={'/admin/meeting'}><Button sx={{color:"orange",margin:"30px"}}>meeting</Button></Link>
        <Link to={'/admin/service'}><Button sx={{color:"orange",margin:"30px"}}>services</Button></Link>
        <Outlet />
      </>
    )
  }
})
export default Main;