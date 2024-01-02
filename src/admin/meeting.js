import { observer } from 'mobx-react-lite';
import storeAppointment from '../store/appointment';
import storeService from '../store/service';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Grid, Card, Typography, CardContent, IconButton, Avatar } from '@mui/material';
const Meeting = observer(() => {
  const data = storeAppointment.dataAppointments;
  let dataSort = data.slice().sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime));

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
        {dataSort.map((meet) => (
          <Grid item xs={12} sm={6} md={4} key={meet.id}>
            <MeetItem meetItem={meet} />
          </Grid>
        ))}
      </Grid>
    </>
  )
})
export default Meeting;


function MeetItem({ meetItem }) {
  const currentDate = new Date();
  const meetDate = new Date(meetItem.dateTime);
  let color = '#57db25c2';
  if (currentDate.toDateString() === meetDate.toDateString()) {
    color = '#f05454d1';
  } else if (
    meetDate >= currentDate &&
    meetDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
  ) {
    color = '#e0af21c2';
  }

  return (
    <Card sx={{ padding: '1rem' ,height:"300px"}}>
      <IconButton>
        <Avatar sx={{ bgcolor: color }}>
          <AccessAlarmIcon></AccessAlarmIcon>
        </Avatar>
      </IconButton>
      <CardContent>
        <Typography variant="h5" component="div">
          Meeting Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>Service Type: </span> {storeService.dataServices?.filter(item => item.id == meetItem.serviceType).name};
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}> Date and Time: </span>{new Date(meetItem.dateTime).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>Client Name: </span> {meetItem.clientName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>Client Phone:</span> {meetItem.clientPhone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>Client Email:</span> {meetItem.clientEmail}
        </Typography>
      </CardContent>
    </Card>
  );

}

