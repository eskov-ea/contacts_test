import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Input } from './Forms/Input';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Box } from '@material-ui/system';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import { createContactFunc } from './createDataFunc';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '648px!important',
        justifyContent: 'center',
        ['@media (max-width:646px)']: {
            maxWidth: '632px!important',
            padding: '0 16px!important',
        },
    },
    createBtn: {
        width: '100%',
        maxWidth: '400px',
        justifyContent: 'flex-start!important',
        ['@media (max-width:400px)']: {
            width: '80%',
            maxWidth: 'none',
        },
    },
    inputs: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 0 10px 0'
    },
    doneBtn: {
        width: '100%',
        maxWidth: '400px'
    },
    closeBtn: {
        color: '#4a4a4a!important',
        padding: '0!important',
        margin: '0 0 5px auto!important',
        minWidth: '0!important'
    },
    errorField: {
        textAlign: 'left',
        color: 'red',
        margin: '10px 0',
        alignSelf: 'flex-start'
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0!important'
    }
}))



export const AddContact = (props) => {

    const styles = useStyles();

    const onCreateContact = () => {
        props.setCreateContact(true)
    };
    const onSaveContact = async () => {

        const createContactId = () => {
            let id;
            if (props.state.length) {
                let id = props.state[props.state.length - 1].id + 1
            } else {
                let id = 1;
            };
            return id;
        }
        /** 
         * Arguments: id, setNameError, setIsNameError, setPhoneError, setIsPhoneError, setState, setCreateContact
        */
        const newContact = createContactFunc(createContactId(), props.userId, props.setNameError, props.setIsNameError, props.setPhoneError, props.setIsPhoneError)
        if (newContact !== undefined) {
            const url = "http://localhost:3004/contacts/"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            })
            if (response.status === 201) {
                try {
                    const url = `http://localhost:3004/contacts?user_id=${props.userId}`;
                    const res = await fetch(url);
                    const contacts = await res.json();
                    props.setState(contacts);
                    props.setCreateContact(false)
                } catch (err) {
                    alert(err)
                }
            }
        }
        return false

    };
    const onCloseBtn = (e) => {
        if (e.currentTarget) {
            props.setCreateContact(false)
        }
    };
    const onLogout = () => {
        props.setUserId(undefined);
        props.setIsAuthenticated(false);
    };

    return (<Container className={styles.root}>
        {
            props.createContact
                ? <Grid className={styles.root} container direction="row" spacing={1}>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={styles.inputs} >
                        <Button onClick={onCloseBtn} className={styles.closeBtn} >
                            <CancelPresentationRoundedIcon fontSize="large" />
                        </Button>
                        <Box className={styles.inputs}>
                            <Input type="text" label="Type name" id="name"
                                variant="outlined" error={props.isNameError} />
                        </Box>
                        <Box className={styles.inputs}>
                            <Input type="tel" label="Type phone" id="phone"
                                variant="outlined" error={props.isPhoneError} />
                        </Box>
                        <Box className={styles.errorField} >
                            <Typography>{props.nameError}</Typography>
                            <Typography>{props.phoneError}</Typography>
                        </Box>
                        <Button className={styles.doneBtn} onClick={onSaveContact}
                            variant="contained">save to contacts</Button>
                    </Grid>
                </Grid>
                : <Grid className={styles.buttonBox} >
                    <Button className={styles.createBtn} variant="contained"
                        onClick={onCreateContact} >
                        <AddBoxIcon fontSize="large" />
                        <Typography>Create contact</Typography>
                    </Button>
                    <Button onClick={onLogout} variant="outlined" >Logout </Button>
                </Grid>
        }

    </Container>)
}