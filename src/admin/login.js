import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, IconButton, InputAdornment, Tooltip, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import storeBusiness from '../store/business';

export default function Login() {
    const { register, handleSubmit, reset } = useForm({ defaultValues: { name: "", password: "" } });
    const [flagAdmin, setFlagAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        reset({ name: "", password: "" })
    }, [flagAdmin])
    function checkLogin(admin) {
        storeBusiness.validationLogin(admin, setFlagAdmin);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(checkLogin)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { width: '30ch' },
                        marginTop: "20%",
                    }}
                >
                    <div>
                        <TextField
                            id="margin-normal" margin="normal"
                            type="text"
                            label={'user name'}
                            {...register("name")} />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("password")} />
                    </div>
                </Box>
                <Tooltip
                    title={isHover ? 'SEND LOGIN' : ''}>
                    <IconButton type='submit'
                        onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                        sx={{ marginTop: "30px" }}>
                        <Avatar sx={{ backgroundColor: "gold" }}>
                            <SendIcon></SendIcon>
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </form>
            {flagAdmin && <Typography variant="body2" color="error">the user name or password not correct!!!</Typography>}
        </>
    )
}

