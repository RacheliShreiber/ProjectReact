import { observer } from "mobx-react-lite";
import { Grid, Card, Typography, CardContent } from '@mui/material';
import storeServices from '../store/service';

const ServiceDetails = observer(() => {
  const data = storeServices.dataServices;
  return (
    <>
      <Grid container spacing={2} >
        {data.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <ServiceItem serviceItem={service} />
          </Grid>
        ))}
      </Grid>
    </>
  )
})
export default ServiceDetails;



export function ServiceItem({ serviceItem }) {
  return (
    <Card sx={{ backgroundColor: 'white', color: 'gold', padding: '1rem',marginBottom:"30px", height: "190px" }}>
      <CardContent >
        <Typography variant="h5" component="div">
          service Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>name service: </span>
          {serviceItem.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>description service: </span>{serviceItem.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>price service: </span>{serviceItem.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold' }}>duration: </span>{serviceItem.duration}
        </Typography>
      </CardContent>
    </Card>
  )
}