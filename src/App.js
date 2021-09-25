import { React, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from './components/LoginPage';
import './App.css';
import { ContactsPage } from './components/ContactsPage';
import { PrivateRoute } from './components/PrivateRoute';
import { data } from './data';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ContactById } from './components/ContactById';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '80px 0 50px 0!important',
    fontWeight: '300',
    ['@media (max-width:499px)']: {
      margin: '20px 0 20px 0!important',
      fontSize: '32px!important',
      letterSpacing: '2.2px!important'
    },
  }
}))

function App() {
  const styles = useStyles();

  const [state, setState] = useState(data.contacts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchValue, setSearchValue] = useState(undefined);

  const [nameError, setNameError] = useState(undefined)
  const [isNameError, setIsNameError] = useState(false)
  const [phoneError, setPhoneError] = useState(undefined)
  const [isPhoneError, setIsPhoneError] = useState(false)
  const [createContact, setCreateContact] = useState(false)

  const SearchFilter = () => {
    if (searchValue) {
      setState(state.filter(item => item.name.toLowerCase().includes(searchValue) && item.name.toLowerCase().indexOf(searchValue) == 0))
    } else {
      setState(data.contacts)
    }
  }

  useEffect(() => {
    SearchFilter()
  }, [searchValue])

  return (
    <BrowserRouter>
      <div className="App">
        <Typography className={styles.root} variant="h3"> CONTACT LIST APP</Typography>
        <Switch>
          <Route exact path="/" >
            <LoginPage setAuth={setIsAuthenticated} data={data} />
          </Route>
          <PrivateRoute exact path="/contacts" auth={isAuthenticated} >
            <ContactsPage state={state} setState={setState} data={data.contacts}
              searchValue={searchValue} setSearchValue={setSearchValue}
              nameError={nameError} setNameError={setNameError} isNameError={isNameError}
              setIsNameError={setIsNameError} phoneError={phoneError} setPhoneError={setPhoneError}
              isPhoneError={isPhoneError} setIsPhoneError={setIsPhoneError} setCreateContact={setCreateContact}
              createContact={createContact} />
          </PrivateRoute>
          <Route path="/contact/:id" >
            <ContactById state={state} setState={setState}
              nameError={nameError} setNameError={setNameError} isNameError={isNameError}
              setIsNameError={setIsNameError} phoneError={phoneError} setPhoneError={setPhoneError}
              isPhoneError={isPhoneError} setIsPhoneError={setIsPhoneError}
            />
          </Route>
          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
