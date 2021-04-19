import './App.css';
// import { BrowserRouter as Router, Switch,  Route, Link } from "react-router-dom";
// import Countdown from './countdown/Countdown.js'
// import Animedoro from './animedoro/Animedoro.js'
// import Stopwatch from './stopwatch/Stopwatch'
import Home from './Home.js'


function App() {
  return (
    <Home />
    // <Router>
    //       <div>
    //         <nav>
    //           <ul>
    //             <li>
    //               <Link to="/">Home</Link>
    //             </li>
    //             <li>
    //               <Link to="/Countdown">Countdown</Link>
    //             </li>
    //             <li>
    //               <Link to="/Aniomedoro">Animedoro</Link>
    //             </li>
    //             <li>
    //               <Link to="/stopwatch">Stopwatch</Link>
    //             </li>
    //           </ul>
    //         </nav>
    //         <Home />
    //         {/* A <Switch> looks through its children <Route>s and
    //             renders the first one that matches the current URL. */}
    //         <Switch>
    //         <Route path="/home">
    //             <Home />
    //           </Route>
    //           <Route path="/Countdown">
    //             <Countdown />
    //           </Route>
    //           <Route path="/Aniomedoro">
    //             <Animedoro />
    //           </Route>
    //           <Route path="/stopwatch">
    //             <Stopwatch />
    //           </Route>
    //         </Switch>
    //       </div>
    //     </Router>
    // <div className="App">
    //   <Countdown />
    //   <Stopwatch /> 
    //   <Animedoro />
    // </div>
  );
}

export default App;
