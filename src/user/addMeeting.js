import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import storeServices from '../store/service';
import storeMeeting from '../store/appointment';

const AddMeeting = observer((props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [secondTime, setSecondTime] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [serviceSelect, setServiceSelect] = useState('');
    const { setDateOk } = props;
    const data = storeServices.dataServices;

    const handleChange = (event) => {
        setServiceSelect(event.target.value);
    }
    function addMeetToStore(meet) {
        storeMeeting.addAppointment(meet, setDateOk, setSecondTime);
    }

    return (
        <>
            <form onSubmit={handleSubmit(addMeetToStore)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '50ch' },
                    }}
                >
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">select service</InputLabel>
                            <Select  {...register("serviceType", { required: "The type meeting is a required field" })}
                                error={Boolean(errors.serviceType)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={serviceSelect}
                                label="serviceType"
                                onChange={handleChange}
                            >
                                {data.map((service) => (<MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="text"
                            label={'name'}
                            {...register("clientName", { required: "The name is a required field" })}
                            error={Boolean(errors.clientName)}
                            helperText={errors.clientName?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="text"
                            label={'phone'}
                            {...register("clientPhone", { required: "The phone is a required field" })}
                            error={Boolean(errors.clientPhone)}
                            helperText={errors.clientPhone?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="email"
                            label={'email'}
                            {...register("clientEmail", { required: "The email is a required field" })}
                            error={Boolean(errors.clientEmail)}
                            helperText={errors.clientEmail?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="datetime-local"
                            label={'date'}
                            {...register("dateTime", { required: "The date is a required field" })}
                            error={Boolean(errors.clientEmail)}
                            helperText={errors.clientEmail?.message}
                        />
                    </div>
                </Box>
                <Tooltip
                    title={isHover ? 'ADD MEETING' : ''}>
                    <IconButton type='submit'
                        onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                        sx={{ marginLeft: "43%" }}>
                        <Avatar sx={{ backgroundColor: "gold" }}>
                            <AddIcon ></AddIcon>
                        </Avatar>
                    </IconButton>
                </Tooltip>
                {secondTime && <Typography variant="body2" color="error" sx={{marginLeft:"40%"}}>the date is catch!!</Typography>}
            </form>
        </>
    )
})

export default AddMeeting;