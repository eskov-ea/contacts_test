import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Input } from './Forms/Input';
import { Button, Stack, Typography, Box, Card, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createUserFunc } from './createDataFunc';

const useStyles = makeStyles({
    root: {
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        ['@media (max-width:599px)']: {
            width: '90%',
            maxWidth: 'none',
        },
    },
    title: {
        padding: '0 0 15px 0',
        color: '#4a4a4a',
        fontWeight: '300'
    },
    stack: {
        width: '100%',
        height: '100%',
        maxWidth: '400px',
        margin: '10px 0'
    },
    error: {
        color: 'red',
        textAlign: 'left'
    },
    button: {
        maxWidth: '500px'
    },
    errorField: {
        textAlign: 'left',
        color: 'red',
        margin: '10px 0',
        alignSelf: 'flex-start'
    }, messageBox: {
        width: '60%',
        // maxWidth: '600px',
        margin: '50px auto 40px auto',
        height: '100px',
        ['@media (max-width:599px)']: {
            width: '90%',
            maxWidth: 'none',
        }
    },
    messageCard: {
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageText: {
        padding: '20px'
    }
})


export const Registration = (props) => {

    const history = useHistory();
    const styles = useStyles();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    // const [errorText, setErrorText] = useState(null);
    const [emailError, setEmailError] = useState(undefined);
    const [isEmailError, setIsEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(undefined);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [successfulRegistartion, setSuccessfulRegistartion] = useState(false);
    const onEmailChange = (e) => {
        setEmailField(e.target.value)
    };
    const onPasswordChange = (e) => {
        setPasswordField(e.target.value)
    };
    const onLogin = () => {
        history.push('/login')
    };
    const getNewUserId = async () => {
        let id;
        const url = `http://localhost:3004/users`;
        const response = await fetch(url);
        const users = await response.json();
        if (users.length) {
            let id = users[users.length - 1].id + 1;
        } else {
            let id = 1;
        };
        return id;
    };

    const onRegistration = async () => {
        const id = await getNewUserId();

        const newUser = createUserFunc(id, setEmailError, setIsEmailError,
            setPasswordError, setIsPasswordError)
        if (newUser) {
            const url = "http://localhost:3004/users";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (response.status === 201) {
                setSuccessfulRegistartion(true)
            }
        }
    };

    return (
        successfulRegistartion
            ? <Box className={styles.messageBox} >
                <Card className={styles.messageCard} >
                    <Typography className={styles.messageText}>Account created successfully. Please, <Link onClick={onLogin} underline="hover" >login.</Link></Typography>
                </Card>
            </Box>
            : <Box className={styles.root} >
                <Typography variant="h4" className={styles.title} >Create account</Typography>
                <Stack spacing={3} className={styles.stack} alignItems="center">
                    <Input type="text" label="Enter email" id="email" variant="outlined"
                        value={emailField} onChange={onEmailChange} error={isEmailError} />
                    <Input type="password" label="Enter pasword" variant="outlined"
                        id="password" value={passwordField} onChange={onPasswordChange}
                        error={isPasswordError} />
                    <Box className={styles.errorField} >
                        <Typography>{emailError}</Typography>
                        <Typography>{passwordError}</Typography>
                    </Box>
                    <Button className={styles.button} variant="contained" onClick={onRegistration} >Registration</Button>
                    {/* <Typography className={styles.error} variant="subtitle1"> {errorText} </Typography> */}
                    <Typography className={styles.link} variant="subtitle1">
                        Have an account?&nbsp;&nbsp;
                        <Link onClick={onLogin} underline="hover" >Login!</Link>
                    </Typography>
                </Stack>
            </ Box>
    )
}