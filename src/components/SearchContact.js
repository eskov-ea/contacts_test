import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Input } from './Forms/Input';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '600px',
        width: '100%',
        ['@media (max-width:599px)']: {
            width: '100%',
            maxWidth: 'none',
            padding: '0 16px',
        },
    },
    container: {
        padding: '0 16px',
        width: '60%!important',
        margin: '30px auto',
        ['@media (max-width:599px)']: {
            width: '100%!important',
            maxWidth: 'none',
            padding: '0'
        },
    },
    subtitle: {
        color: '#696969'
    }
}))

export const SearchContact = (props) => {
    const styles = useStyles();
    let contacts = props.contacts

    const onSearchFieldChange = (e) => {
        props.setSearchValue(e.currentTarget.value.toLowerCase())
    }
    const onFocus = (e) => {
        props.setCreateContact(false)
    }




    return (<Grid container justifyContent="center" className={styles.container}>
        <Grid item className={styles.root}  >
            <Typography className={styles.subtitle} component="div"
                align='left' variant="caption" >Search for a contact</Typography>
            <Input styles={styles} type="text" placeholder="Start typing a name.." id="search"
                variant="outlined" onChange={onSearchFieldChange} onFocus={onFocus} />
        </Grid>
    </Grid>)
}