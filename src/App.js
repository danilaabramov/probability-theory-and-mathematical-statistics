import React,{useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Teorver} from './pages/Teorver'
import {Teorver2} from './pages/Teorver2'
import {Teorver3} from './pages/Teorver3'
import {Iat} from './pages/Iat'

function App() {

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
                            <Route path="/teorver">
                           <div style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                           <div style={{width: '100%'}}>
                        
                               <Link to="/teorver" style={{ textDecoration: 'none', color: 'white' }}><div  style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">1</div></div></Link>
                              <Link to="/teorver2" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">2</div></div></Link>
                               <Link to="/teorver3" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">3</div></div></Link>
                             
                           </div>
                            </div>
                            <Teorver/> 
                            </Route>
                            <Route path="/teorver2">
                            <div style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                            <div style={{width: '100%'}}>
                        
                        <Link to="/teorver" style={{ textDecoration: 'none', color: 'white' }}><div  style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">1</div></div></Link>
                       <Link to="/teorver2" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">2</div></div></Link>
                        <Link to="/teorver3" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">3</div></div></Link>
                      
                    </div>
                            </div>
                                <Teorver2/>
                            </Route>
                            <Route path="/teorver3">
                            <div style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                           <div  style={{width: '100%'}}>
                        
                               <Link to="/teorver" style={{ textDecoration: 'none', color: 'white' }}><div  style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">1</div></div></Link>
                              <Link to="/teorver2" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">2</div></div></Link>
                               <Link to="/teorver3" style={{ textDecoration: 'none', color: 'white' }}><div style={{width: '33.33%', display: 'inline-block '}}><div className="btn-link">3</div></div></Link>
                             
                           </div>
                            </div>
                                <Teorver3/>
                            </Route>

                            <Route path="/stattistics-on-baggage-losses-published">
                                <Iat/>
                            </Route>
                            <Route path="/">
                                <div style={{textAlign: 'center', fontWeight: 'bold'}}>Добро пожаловать в Клондайк студента</div>
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
