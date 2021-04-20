import './Home.css';
import { Link } from "react-router-dom";


function Home() {
    return (
      <div className='main-container'>
          <h1>TIMED</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <div className='nav-links'>
              <Link to='/countdown'>
              <button>Countdown</button>
              </Link>
              <Link to='/animedoro'>
              <button>Animedoro</button>
              </Link>
              <Link to='/stopwatch'>
              <button>Stopwatch</button>
              </Link>
          </div>
      </div>
    );
  }
  
  export default Home;