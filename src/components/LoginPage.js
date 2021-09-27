import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Input } from './Forms/Input';
import { Button, Stack, Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
        fontWeight: '300',
        ['@media (max-width:499px)']: {
            fontSize: '28px!important',
            letterSpacing: '1.2px!important'
        },
    },
    stack: {
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        margin: '10px 0'
    },
    button: {
        maxWidth: '500px',
    },
    errorField: {
        textAlign: 'left',
        color: 'red',
        margin: '10px 0',
        alignSelf: 'flex-start'
    }, messageBox: {
        width: '60%',
        margin: '50px auto 40px auto',
        height: '100px',
        ['@media (max-width:599px)']: {
            width: '90%',
            maxWidth: 'none',
        }
    },
});


export const LoginPage = (props) => {

    const history = useHistory();
    const styles = useStyles();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState(null);

    const onEmailChange = (e) => {
        setEmailField(e.target.value)
    };
    const onPasswordChange = (e) => {
        setPasswordField(e.target.value)
    };
    const onRegistrate = () => {
        history.push('/registration')
    };

    const onLogin = async () => {
        const url = "http://localhost:3004/users";
        const response = await fetch(url);
        const users = await response.json();
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === emailField &&
                users[i].password === passwordField) {
                props.setUserId(users[i].id);
                props.setIsAuthenticated(true);
                history.push("/contacts")
                return
            }
        };
        setError(true);
        setErrorText('*login or password is incorect');
    };

    return (
        <Box className={styles.root} >
            <Typography variant="h4" className={styles.title} >Login with Us</Typography>
            <Stack spacing={3} className={styles.stack} alignItems="center">
                <Input type="text" label="Enter email" id="outlined-basic" variant="outlined"
                    value={emailField} onChange={onEmailChange} error={error} />
                <Input type="password" label="Enter pasword" variant="outlined"
                    id="outlined-basic" value={passwordField} onChange={onPasswordChange}
                    error={error} />
                <Box className={styles.errorField} >
                    <Typography variant="subtitle1"> {errorText} </Typography>
                </Box>
                <Button className={styles.button} variant="contained" onClick={onLogin} >Login</Button>
                <Typography className={styles.link} variant="subtitle1">
                    Do not have an account?&nbsp;&nbsp;
                    <Link onClick={onRegistrate} underline="hover" >Registrate!</Link>
                </Typography>
            </Stack>
        </Box>
    )
}