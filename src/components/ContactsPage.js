import { Grid } from "@material-ui/core";
import React from "react";
import { AddContact } from "./AddContact";
import { Contact } from "./Contact";
import { SearchContact } from "./SearchContact";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 0 100px 0'
    }
}))

export const ContactsPage = (props) => {
    const styles = useStyles();

    return (
        <Grid className={styles.root}>
            <AddContact data={props.data} state={props.state} setState={props.setState}
                nameError={props.nameError} setNameError={props.setNameError} isNameError={props.isNameError}
                setIsNameError={props.setIsNameError} phoneError={props.phoneError} setPhoneError={props.setPhoneError}
                isPhoneError={props.isPhoneError} setIsPhoneError={props.setIsPhoneError} setCreateContact={props.setCreateContact}
                createContact={props.createContact} userId={props.userId} setUserId={props.setUserId} setIsAuthenticated={props.setIsAuthenticated} />
            <SearchContact state={props.state} searchValue={props.searchValue} setSearchValue={props.setSearchValue}
                setCreateContact={props.setCreateContact} createContact={props.createContact} />
            <Contact state={props.state} setState={props.setState} theme={props.theme}
                nameError={props.nameError} setNameError={props.setNameError} isNameError={props.isNameError}
                setIsNameError={props.setIsNameError} phoneError={props.phoneError} setPhoneError={props.setPhoneError}
                isPhoneError={props.isPhoneError} setIsPhoneError={props.setIsPhoneError} userId={props.userId}
                SearchFilter={props.SearchFilter} isSearchValueChanged={props.isSearchValueChanged}
                setIsSearchValueChanged={props.setIsSearchValueChanged}
            />
        </Grid>
    )
}