import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Input } from './Forms/Input';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Box } from '@material-ui/system';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import { createContactFunc } from './createContactFunc';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '400px',
        width: '100%',
        margin: '20px 0',
        justifyContent: 'flex-end'
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
        margin: '0 0 10px 0'
    },
    doneBtn: {
        width: '100%',
        maxWidth: '400px'
    },
    closeBtn: {
        color: '#4a4a4a!important',
        padding: '0!important',
        margin: '0 0 5px 0!important',
        minWidth: '0!important'
    },
    errorField: {
        textAlign: 'left',
        color: 'red',
        margin: '10px 0',
        alignSelf: 'flex-start'
    }
}))



export const AddContact = (props) => {

    const styles = useStyles()


    const onCreateContact = () => {
        props.setCreateContact(true)
    }
    const onSaveContact = () => {
        const id = props.state[props.state.length - 1].id + 1
        /** 
         * Arguments: id, setNameError, setIsNameError, setPhoneError, setIsPhoneError, setState, setCreateContact
        */
        const newContact = createContactFunc(id, props.setNameError, props.setIsNameError, props.setPhoneError, props.setIsPhoneError)
        if (newContact != undefined) {
            const updatedContactsList = [...props.state, newContact]
            props.data.push(newContact);
            props.setState(updatedContactsList)
            props.setCreateContact(false)
        }
        return false

    }

    const onCloseBtn = (e) => {
        if (e.currentTarget) {
            props.setCreateContact(false)
        }
    }


    return (<Container className={styles.root}>
        {
            props.createContact
                ? <Grid className={styles.root} container direction="row" spacing={1}>
                    <Button onClick={onCloseBtn} className={styles.closeBtn} >
                        <CancelPresentationRoundedIcon fontSize="large" />
                    </Button>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={styles.inputs} >
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
                : <Grid>
                    <Button className={styles.createBtn} variant="contained"
                        onClick={onCreateContact} >
                        <AddBoxIcon fontSize="large" />
                        <Typography>Create contact</Typography>
                    </Button>
                </Grid>
        }

    </Container>)
}


    // const onSaveContact = () => {
    //     const name = document.querySelector('#name').value
    //     const phone = document.querySelector('#phone').value
    //     const id = props.state[props.state.length - 1].id + 1
    //     // const id = props.data.contacts[props.data.contacts.length - 1].id + 1

    //     /**
    //     * validation part start
    //     */
    //     const [name_error, phone_error] = checkForm(name, phone)
    //     if (name_error || phone_error) {
    //         if (name_error) {
    //             setNameError(name_error);
    //             setIsNameError(true);
    //         } else {
    //             setNameError(name_error);
    //             setIsNameError(false);
    //         }
    //         if (phone_error) {
    //             setPhoneError(phone_error);
    //             setIsPhoneError(true);
    //         } else {
    //             setPhoneError(phone_error);
    //             setIsPhoneError(false);
    //         }
    //         return
    //     }
    //     setNameError(name_error);
    //     setIsNameError(false);
    //     setPhoneError(phone_error);
    //     setIsPhoneError(false);
    //     /**
    //     * validation part end
    //     */


    //     const contactObj = {
    //         "id": id,
    //         "name": name,
    //         "phone": phone
    //     }
    //     const newContact = [...props.state, contactObj]
    //     props.data.push(contactObj)
    //     props.setState(newContact)
    //     setCreateContact(false)
    // }