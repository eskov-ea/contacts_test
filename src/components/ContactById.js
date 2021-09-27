import React, { useState } from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Input } from './Forms/Input';
import { makeStyles } from '@material-ui/styles';
import { createContactFunc } from './createDataFunc';


const useStyles = makeStyles(theme => ({
    root: {

        ['@media (max-width:499px)']: {

        },
    },
    gridItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        margin: '10px 0 10px 0!important',
        fontWeight: '900',
        letterSpacing: '2.2px!important'
    },
    container: {
        width: '60%',
        maxWidth: '400px',
    },
    box: {
        margin: '0 0 10px 0'
    },
    saveBtn: {
        width: '100%',
        margin: '10px 0 0 0!important'
    },
    backBtn: {
        width: '100%',
        margin: '30px 0 0 0!important'
    },
    errorField: {
        textAlign: 'left',
        color: 'red',
        margin: '10px 0',
        alignSelf: 'flex-start'
    }
}));

export const ContactById = (props) => {
    const history = useHistory();
    const styles = useStyles();
    const contact = props.state.filter(item => item.id === Number(history.location.pathname.split(/[^1-9]*/).join('')));

    const [name, setName] = useState(contact[0].name);
    const [phone, setPhone] = useState(contact[0].phone);
    const onNameChange = (e) => {
        setName(e.currentTarget.value)
    };
    const onPhoneChange = (e) => {
        setPhone(e.currentTarget.value)
    };
    const onBack = () => {
        props.setNameError(undefined);
        props.setPhoneError(undefined);
        props.setIsNameError(false);
        props.setIsPhoneError(false);
        props.setSearchValue(undefined);
        history.push('/contacts')
    };
    const onSave = async () => {
        const id = contact[0].id;
        /**
         * Arguments: id, setNameError, setIsNameError, setPhoneError, setIsPhoneError
        */
        const editedContact = createContactFunc(id, props.userId, props.setNameError, props.setIsNameError, props.setPhoneError, props.setIsPhoneError)
        if (editedContact !== undefined) {
            const url = `http://localhost:3004/contacts/${id}`
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedContact)
            })
            if (response.status === 200) {
                const url = `http://localhost:3004/contacts?user_id=${props.userId}`;
                const res = await fetch(url);
                const contacts = await res.json();
                props.setState(contacts);
                history.push('/contacts');
            } else {
                alert("Something went wrong! try again")
            }
        }
        return false
    };

    return (
        <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Grid item className={styles.gridItem}>
                <Grid className={styles.container}>
                    <Typography className={styles.title} variant="h5" textAlign={'left'} gutterBottom > Edit contact: </Typography>
                    <Box className={styles.box} >
                        <Input type="text" id="name" label="change name"
                            variant="outlined" value={name} onChange={onNameChange}
                            error={props.isNameError} />
                    </Box>
                    <Box className={styles.box} >
                        <Input type="tel" id="phone" label="change phone"
                            variant="outlined" value={phone} onChange={onPhoneChange}
                            error={props.isPhoneError} />
                    </Box>
                    <Box>
                        <Typography className={styles.errorField} >{props.nameError}</Typography>
                        <Typography className={styles.errorField} >{props.phoneError}</Typography>
                    </Box>
                    <Button className={styles.saveBtn} variant="contained" onClick={onSave} > Save</Button>
                    <Button className={styles.backBtn} variant="contained"
                        color="secondary" onClick={onBack} > Back </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}