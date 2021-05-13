import React,{useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Teorver} from './Teorver'

const App = () => {
  return (
    <div  className="App" style={{overflowX: 'hidden'}}>
      <main className="App-main">
        <Router>
            <div className="header2" style={{ position: 'fixed', zIndex: 1000, width: '100%'}}>
                <div className="header" style={{maxWidth: '1100px',  margin: 'auto', height: '70px', display: 'flex'}}>
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + "/Student.png"} style={{width: 60, height: 60, margin: 5}}  alt="альтернативный текст"/>
                    </Link>
                    <div style={{marginTop: '15px', fontWeight: 'bold'}}  className="Logo" >Клондайк студента</div>
                </div>
            </div>
            <div style={{height: 80}}/>
                <div>
                    <div className="content" style={{borderRadius: '20px', maxWidth: '1000px', margin: 'auto', padding: '30px', marginBottom: '50px'}}>
                        <Switch>
                            <Route path="/">
                                <Teorver/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
      </main>
    </div>
  );
}
export default App;
