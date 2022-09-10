import { useEffect,useState } from "react";


//to list all students under a mentor
function ShowStudentsOfMentor(){
    let[mentors,setMentors] = useState([]);
    let[selectedMentorId,setSelectedMentorId]=useState("select mentor");
    let[namesList,setNamesList] =useState([]);

    //api call to fetch all mentors and display in dropdown
    useEffect(() => {
        fetch("http://127.0.0.1:4300/mentors")
        .then(response => response.json())
        .then(data => {
            setMentors(data);
        })
    },[])

    function handleChange(event){
       
        let id= event.nativeEvent.target.selectedOptions[0].value;
        setSelectedMentorId(id);
    }


const onSubmit = (e)=>{
    setNamesList([]);
    e.preventDefault();
   
     //call api to get students under a mentor and set to setNamesList array
    fetch(`http://127.0.0.1:4300/showStudentsOfMentor/${selectedMentorId}`)
    .then(response => response.json())
    .then(data => setNamesList(data.students_list));
}


    return(
        <form className="container mt-5 m-auto d-flex flex-column" onSubmit={onSubmit}>

            <div className="d-flex">
            <div className="fw-bold mt-1">See Students for:</div>
            <div><select className="form-select mx-3" id="mentor" name="mentor" value={selectedMentorId} onChange={handleChange}>
                <option value="select mentor">Select Mentor</option>
                {mentors.map((mentor,index) => {
                    return <option value={mentor._id} key={index}>{`${mentor.name}`}</option>
                })}
            </select></div>
            <div>
            <div className="d-flex justify-content-center mx-5">
                <button className="get-students btn btn-primary" type="submit">Get Students</button>
            </div></div>
            </div>

           

            {namesList.length !== 0? <div className="mt-5 d-flex flex-column align-items-start"> <div className="fw-bold">Students' Id:</div>
            {namesList.map((name,index) => {
                    return <li key={index}>{`${name}`}</li>
                })}
            </div>:<div className="d-flex mt-5 justify-content-start">No Student Assigned</div>}
            
            
            
        </form>
    )
}

export default ShowStudentsOfMentor;