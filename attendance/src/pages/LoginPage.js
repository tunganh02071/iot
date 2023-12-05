/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import {Box} from "@mui/material";
import useAuth from "./useAuth";
import { userLogin } from "./api/login-api";
import * as React from "react";


const schema = yup.object({
        email: yup.string().required("validation.required"),
    password: yup.string().required("validation.required"),
});

const LoginPage = memo(({open, setOpen}) => {
    const { setAuth } = useAuth();
    const handleClose = () => {
        setOpen(false);
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {email: "",
            password: "",
            username: "",},
        resolver: yupResolver(schema),
    });

    const handleLoginUser = (data) => {
        loginMuatation.mutate(data, {

            onSuccess: (loginResponse) => {

                setAuth({
                    accessToken: loginResponse.data.accessToken,
                    username: loginResponse.data.user.username,
                    email: loginResponse.data.user.email,
                    role: loginResponse.data.user.role,
                    id: loginResponse.data.user.id,
                });
            },
        });
        reset(data);
    };

    const loginMuatation = useMutation({
        mutationFn: (body) => {
            return userLogin(body);
        },
        onError: (data) => {

        },
        onSuccess: () => {
            console.log("111111")
            setOpen(false)
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
                            <form onSubmit={handleSubmit(handleLoginUser)}>
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

export default LoginPage;
