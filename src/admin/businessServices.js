import { useState } from "react";
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react-lite";
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import ServiceDetails from "../user/serviceDetails";
import storeServices from '../store/service';

const BusinessServices = observer(() => {
    const [flagAddService, setFlagAddService] = useState(false);

    return (
        <>
            <ServiceDetails></ServiceDetails>
            <Button sx={{ color: "orange", margin: "30px" }} onClick={() => setFlagAddService(true)}>add service</Button>
            <Dialog open={flagAddService} onClose={() => setFlagAddService(false)}>
                <DialogTitle sx={{ color: "gold", marginLeft: "35%" }}>Add Service</DialogTitle>
                <DialogContent>
                    <AddService closeForm={setFlagAddService} />
                </DialogContent>
            </Dialog>
        </>
    )
})
export default BusinessServices;

export function AddService({ closeForm }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isHover, setIsHover] = useState(false);

    function addService(service) {
        closeForm(false);
        storeServices.addService(service);
    }

    return (
        <>
            <form onSubmit={handleSubmit(addService)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '50ch' },
                    }}
                >
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="text"
                            label={'name'}
                            {...register("name", { required: "The name is a required field" })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="text"
                            label={'description'}
                            {...register("description", { required: "The description is a required field" })}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="number"
                            label={'price'}
                            {...register("price", { required: "The price is a required field" })}
                            error={Boolean(errors.price)}
                            helperText={errors.price?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="number"
                            label={'duration'}
                            {...register("duration", { required: "The duration is a required field" })}
                            error={Boolean(errors.duration)}
                            helperText={errors.duration?.message}
                        />
                    </div>
                </Box>
                <Tooltip
                    title={isHover ? 'ADD SERVICE' : ''}>
                    <IconButton type='submit'
                        onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                        sx={{ marginLeft: "43%" }}>
                        <Avatar sx={{ backgroundColor: "gold" }}>
                            <AddIcon ></AddIcon>
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </form>
        </>
    )
}