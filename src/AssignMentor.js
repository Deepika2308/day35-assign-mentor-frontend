import './App.css';
import {useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles.css';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Modal} from 'react-bootstrap';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {useNavigate} from "react-router-dom";
import {API} from "./global.js";

// **********
export function AssignMentor(){

  let[students,setStudents] = useState([]);
  let[stud_id,setStud_id]= useState("");
  let[details,setDetails] =useState({});

  let[mentors,setMentors] = useState([]);

  useEffect(() =>{
    fetch(`${API}/students`)
    .then(response => response.json())
    .then(data =>{
      setStudents(data);
    })

    fetch(`${API}/mentors`)
    .then(response => response.json())
    .then(data =>{
      setMentors(data);
    })
  },[])

const handleChange=(event) =>{
    setDetails({});
 let id = event.nativeEvent.target.selectedOptions[0].value;
 setStud_id(id);
 
 //fetch the record of particular student
 if(id !== "selectStudent"){
    fetch(`${API}/student/${id}`)
.then(response => response.json())
.then(data =>{
    setDetails(data);
})
 }

}

  return(
    <div className="container">
      <h3 className="mt-4 mb-4">Assign Mentor</h3>
      <div className="container d-flex flex-column gap-4 w-50 m-auto">
        <select className="form-select" value={stud_id} onChange={handleChange}>
          <option value="selectStudent">Select Student</option>
          {students.map((stu,index) => {
            let sid=stu._id.toString();
            return <option value={sid} key={index}>{`${stu.name}`}</option>
          })}
        </select>
        {details.profile ? <div><span className="fw-bold">Profession: </span>{`${details.profile}`}</div> :"" }
        {details.batch ? <div><span className="fw-bold">Batch: </span>{`${details.batch} - ${details.week}`}</div> :"" }
        {details.course ? <div><span className="fw-bold">Course: </span>{`${details.course}`}</div> :"" }
        {details.hasOwnProperty('mentor') ? <div><span className="fw-bold">Mentor: </span>{`${details.mentor}`}</div> :"" }

        {details.name ? <ShowMentors mentors={mentors} student={details._id} /> :""}
        
      </div>
    </div>
  )
}
// ***************

//dropdown to display all mentors
function ShowMentors({mentors,student}){

  let navigate=useNavigate();
  let[show,setShow] = useState(false);
  let[msg,setMsg] = useState("");

    let {handleSubmit,values,handleChange}= useFormik({
        initialValues:{mentor:""},
        onSubmit:(values) => {

          //put the mentor id in object to pass in fetch body
            let obj = {'mentor':values.mentor};

            //get the students array of assigning mentor and add current student to it
            let res = mentors.filter((obj2) => {
              return (obj2._id.toString() === obj.mentor)
            })
        
          let arr= res[0].students_list;
          arr.push(student);
          

          //student object to pass in assign-student fetch call
          let student_result = {
            'students_list':arr
          }
           

          //assign the mentor to the selected student
            fetch(`${API}/assign-mentor/${student}`,{
                method:"PUT",
                body:JSON.stringify(obj),
                headers:{"content-type":"application/json"},
            })
            .then(response => response.json())
            .then(data => {
              if(data.acknowledged){
                setShow(true);
                setMsg("Mentor assigned successfully");
              }
              else{
                setShow(true);
                setMsg("Error in assigning student");
              }
            })

            //add the student to the mentor's students list
            fetch(`${API}/assign-students/${obj.mentor}`,{
                method:"PUT",
                body:JSON.stringify(student_result),
                headers:{"content-type":"application/json"},
            })
        }
    })
    return(
        <form className="container mb-4" onSubmit={handleSubmit}>
            <select className="form-select" id="mentor" name="mentor" value={values.mentor} onChange={handleChange}>
                <option value="selectMentor">Select Mentor</option>
                {mentors.map((ment,index) => {
                    let topics=ment.topics;
                   
                    let langs =ment.languages;
                    return <OverlayTrigger key={index}
                    trigger={["hover", "focus"]}
                    placement="right"
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Body>
                          <div>
                            {topics.map((topic,index) =>{
                                return <div key={index}>{`${topic}`}</div>
                            })}
                             {langs.map((lang,index) =>{
                                 return <div key={index}>{`${lang}`}</div>
                            })}
                            
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <option value={ment._id} key={index}>{`${ment.name}`}</option>
                  </OverlayTrigger>
                    
                })}
            </select>

            {/* show success message after assignment */}
            {show ? <div className="text-success">{msg}</div> : ""}

            <div className="d-flex flex-column gap-2 align-items-center mt-4">
        <button className="btn btn-primary text-center col-3" type="submit">Assign</button>
        <button className="btn btn-secondary mt-4 col-3" type="button" onClick={() => navigate("/")}>Home</button>
        </div>
        </form>
    )
}
