/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import * as yup from "yup";

// serviceApi
import { createUser } from "./api/login-api";
import {Box} from "@mui/material";

const schema = yup.object({
    username: yup.string().required(() => ("This field is requirte")),
    email: yup.string().required(() =>("This field is requirte")),
    password: yup.string().required(() => ("This field is requirte")),
});

const RegisterPage = memo(({open, setOpen}) => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handelSave = (data) => {
        console.log(data)
        mutate(data, {
            onSuccess: () => {},
            onError: () => {},
        });
    };

    const { mutate } = useMutation({
        mutationFn: (body) => {
            return createUser(body);
        },
        onError: () => {
            toast.error(("register_error"), {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
        onSuccess: () => {
            setOpen(false)
            toast.success(("register_success"), {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <form onSubmit={handleSubmit(handelSave)}>
                                <Box className="mb-3" controlId="formBasicEmail">
                                    <span>{("Email")}</span>
                                    <input
                                        type="email"
                                        pattern=".+@gmail\.com"
                                        placeholder="Enter email"
                                        {...register("email")}
                                    />
                                    <p className="mt-1 text-danger">{errors.email?.message}</p>
                                </Box>
                                <Box className="mb-3" controlId="formBasicEmail">
                                    <span>{("user_name")}</span>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        {...register("username")}
                                    />
                                    <p className="mt-1 text-danger">{errors.username?.message}</p>
                                </Box>
                                <Box className="mb-3" controlId="formBasicPassword">
                                    <span>{("pasword")}</span>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                    <p className="mt-1 text-danger">{errors.password?.message}</p>
                                </Box>
                                <span>{("allready_have_an_account")}</span>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>
                                <Button onClick={handleClose} autoFocus>
                                    Close
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default RegisterPage;
