import React from 'react'
import { Container, Grid, Card, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '0 0 10px 0!important',
    },
    cardContainer: {
        padding: '0 0!important',
        ['@media (max-width:767px)']: {
            padding: '0 16px!important',
        },
    },
    wrapper: {
        width: '60%',
        maxWidth: '600px',
        ['@media (max-width:599px)']: {
            width: '100%',
            maxWidth: 'none',
        },
    },
    card: {
        width: '100%',
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        }
    },
    cardInfo: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        padding: '0 20px',
        ['@media (max-width:499px)']: {
            padding: '0 10px',
        },
        ['@media (max-width:399px)']: {
            flexDirection: 'column',
            flexWrap: 'nowrap',
            overflow: 'scroll'
        },
    },
    deleteBtn: {
        ['@media (max-width:499px)']: {
            minWidth: '32px!important',
        },
    },
    span: {
        margin: '0 20px 0 -20px',
        height: '40px',
        width: '1px',
        backgroundColor: '#c7c7c7',
        ['@media (max-width:599px)']: {
            margin: '0 5px 0 -10px',
        },
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    contactListTitle: {
        margin: '0 auto 10px 0!important',
        letterSpacing: '2.2px!important',
        ['@media (max-width:599px)']: {

        },
    },
    infoCard: {
        maxWidth: '600px',
        margin: '0 auto',
        height: '150px',
        padding: '20px 0 0 0',
        ['@media (max-width:599px)']: {
            margin: '0 16px',
            padding: '10px!important'
        },
    }
}))

export const Contact = (props) => {
    let contacts = props.state;
    const styles = useStyles();
    const history = useHistory();

    const onDeleteContact = async (e) => {
        const id = e.currentTarget.id
        if (id) {
            const url = `http://localhost:3004/contacts/${id}`
            const response = await fetch(url, {
                method: "DELETE"
            })
            if (response.status === 200) {
                try {
                    const url = `http://localhost:3004/contacts?user_id=${props.userId}`;
                    const res = await fetch(url);
                    const contacts = await res.json();
                    props.setState(contacts);
                    props.setIsSearchValueChanged(!props.isSearchValueChanged);
                } catch (err) {
                    alert(err)
                }
            }
        } else {
            alert('Error! Try again!')
        }
    };
    const editContact = (e) => {
        props.setNameError(undefined);
        props.setPhoneError(undefined);
        props.setIsNameError(false);
        props.setIsPhoneError(false);
        const id = e.currentTarget.id
        history.push(`/contact/${id}`)
    };

    return (<>
        {
            contacts.length
                ? <Container className={styles.cardContainer} >

                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid className={styles.wrapper} container
                            direction="column"
                            justifyContent="center"
                            alignItems="center">
                            <Typography className={styles.contactListTitle} component="div"
                                textAlign={'left'} variant="h5" gutterBottom> Contacts:</Typography>
                            {
                                contacts.map((contact) => (
                                    <Grid item key={contact.id} className={styles.root} >
                                        <Card className={styles.card} >
                                            <Box className={styles.cardInfo}>
                                                <Typography> {contact.name} </Typography>
                                                <Typography> {contact.phone} </Typography>
                                            </Box>
                                            <Box className={styles.buttons}>
                                                <Button className={styles.deleteBtn} id={contact.id} onClick={editContact} >
                                                    <span className={styles.span} ></span>
                                                    <EditIcon />
                                                </Button>
                                                <Button className={styles.deleteBtn} id={contact.id} onClick={onDeleteContact} >
                                                    <span className={styles.span} ></span>
                                                    <DeleteIcon />
                                                </Button>
                                            </Box>
                                        </Card>

                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Container>
                : <Card className={styles.infoCard} >
                    <Typography variant="h5" >No contacts found! =(</Typography>
                    <Typography >It may happen you have no contact yet or you search outside you contacts list. Create a contact or change the search statement.</Typography>
                </Card>
        }
    </>)
}