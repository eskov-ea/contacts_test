import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Input } from './Forms/Input';
import { Button, Stack, Typography } from '@material-ui/core';
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
        fontWeight: '300'
    },
    stack: {
        width: '100%',
        height: '100%',
        margin: '10px 0'
    },
    error: {
        color: 'red',
        textAlign: 'left'
    },
    button: {
        maxWidth: '500px'
    }
})


export const LoginPage = (props) => {

    const history = useHistory();
    const styles = useStyles()
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState(null)

    const onEmailChange = (e) => {
        setEmailField(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPasswordField(e.target.value)
    }

    const onLogin = () => {
        const [personEmail, requiredEmail] = [emailField, props.data.user[0].email]
        const [personPass, requiredPass] = [passwordField, props.data.user[0].password]

        if (personEmail === requiredEmail && personPass === requiredPass) {
            props.setAuth(true)
            history.push("/contacts")
        } else {
            setError(true)
            setErrorText('* email or password is incorrect')
        }
    }

    return (
        <div className={styles.root} >
            <Typography variant="h4" className={styles.title} >Login with Us</Typography>
            <Stack spacing={3} className={styles.stack} alignItems="center">
                <Input type="text" label="Enter email" id="outlined-basic" variant="outlined"
                    value={emailField} onChange={onEmailChange} error={error} />
                <Input type="password" label="Enter pasword" variant="outlined"
                    id="outlined-basic" value={passwordField} onChange={onPasswordChange}
                    error={error} />
                <Button className={styles.button} variant="contained" onClick={onLogin} >Login</Button>
                <Typography className={styles.error} variant="subtitle1"> {errorText} </Typography>
            </Stack>
        </ div>
    )
}