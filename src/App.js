import { React, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from './components/LoginPage';
import './App.css';
import { ContactsPage } from './components/ContactsPage';
import { PrivateRoute } from './components/PrivateRoute';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ContactById } from './components/ContactById';
import { Registration } from './components/Registration';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '80px 0 50px 0!important',
    fontWeight: '300',
    letterSpacing: '2.2px!important',
    ['@media (max-width:499px)']: {
      margin: '40px 0 40px 0!important',
      fontSize: '28px!important',
      letterSpacing: '1.2px!important'
    },
  }
}));

function App() {
  const styles = useStyles();

  const [state, setState] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const [searchValue, setSearchValue] = useState(undefined);
  const [isSearchValueChanged, setIsSearchValueChanged] = useState(false)
  const [nameError, setNameError] = useState(undefined);
  const [isNameError, setIsNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(undefined);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [createContact, setCreateContact] = useState(false);

  const SearchFilter = async () => {
    if (searchValue) {
      setState(state.filter(item => item.name.toLowerCase().includes(searchValue) && item.name.toLowerCase().indexOf(searchValue) === 0))
    } else {
      const url = `http://localhost:3004/contacts?user_id=${userId}`;
      const res = await fetch(url);
      const contacts = await res.json();
      setState(contacts)
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const url = `http://localhost:3004/contacts?user_id=${userId}`;
        const res = await fetch(url);
        const contacts = await res.json();
        setState(contacts);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    SearchFilter()
  }, [searchValue, isSearchValueChanged]);

  return (
    <BrowserRouter>
      <Box className="App">
        <Typography className={styles.root} variant="h3"> CONTACT LIST APP</Typography>
        <Switch>
          <Route exact path="/" >
            <LoginPage setUserId={setUserId} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route exact path="/registration" >
            <Registration setUserId={setUserId} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <PrivateRoute exact path="/contacts" auth={isAuthenticated} >
            <ContactsPage state={state} setState={setState}
              searchValue={searchValue} setSearchValue={setSearchValue}
              nameError={nameError} setNameError={setNameError} isNameError={isNameError}
              setIsNameError={setIsNameError} phoneError={phoneError} setPhoneError={setPhoneError}
              isPhoneError={isPhoneError} setIsPhoneError={setIsPhoneError} setCreateContact={setCreateContact}
              createContact={createContact} userId={userId} setUserId={setUserId} setIsAuthenticated={setIsAuthenticated}
              isSearchValueChanged={isSearchValueChanged} setIsSearchValueChanged={setIsSearchValueChanged} />
          </PrivateRoute>
          <PrivateRoute auth={isAuthenticated} >
            <Route path="/contact/:id" >
              <ContactById state={state} setState={setState}
                nameError={nameError} setNameError={setNameError} isNameError={isNameError}
                setIsNameError={setIsNameError} phoneError={phoneError} setPhoneError={setPhoneError}
                isPhoneError={isPhoneError} setIsPhoneError={setIsPhoneError} userId={userId}
                setSearchValue={setSearchValue}
              />
            </Route>
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;
