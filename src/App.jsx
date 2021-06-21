import React from 'react';
import { createUseStyles } from 'react-jss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage';
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
        <Header />
        <LandingPage />
        <Footer />
      </main>
    </AppContext>
  );
}

export default App;
