import React from 'react';
import { createUseStyles } from 'react-jss';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';
import AppContext from './context';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
});
function App() {
  const classes = useStyles();
  return (
    <AppContext>
      <main className={classes.root}>
        <Header headerText="Minneapolis Metro Transit" />
        <LandingPage />
        <Footer />
      </main>
    </AppContext>
  );
}

export default App;
