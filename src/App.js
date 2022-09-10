import './App.css';
import './styles.css';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as yup from 'yup';
import {AssignMentor} from "./AssignMentor";
import ShowStudentsOfMentor from "./StudentsOfMentor";
import { CreateMentor } from './CreateMentor';
import { CreateStudent } from './CreateStudent';
import { AssignStudents } from './AssignStudents';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<><Header /><ShowStudentsOfMentor /></>}></Route>
        <Route path="/create-mentor" element={<><Header /><CreateMentor /></>}></Route>
        <Route path="/create-student" element={<><Header /><CreateStudent /></>}></Route>
        <Route path="/assign-students" element={<><Header /><AssignStudents /></>}></Route>
        <Route path="/assign-mentor" element={<><Header /><AssignMentor /></>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

function Header(){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHead" aria-controls="navbarHead" aria-expanded="false" aria-label="toggle navigation">
          <span className="navbar-toggler-icon text-dark"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarHead">
          <ul className="navbar-nav d-lg-flex gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/create-student">Create Student</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/create-mentor">Create Mentor</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/assign-students">Assign Students</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/assign-mentor">Assign Mentor</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


export default App;
