import { useEffect,useState } from "react";


function ShowStudentsOfMentor(){
    let[mentors,setMentors] = useState([]);
    let[selectId,setSelectId]=useState("select mentor");
    let[namesList,setNamesList] =useState([]);
    let[result,setResult] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:4300/mentors")
        .then(response => response.json())
        .then(data => {
            setMentors(data);
        })
    },[])

    function handleChange(event){
       
        let id= event.nativeEvent.target.selectedOptions[0].value;
        console.log(id);
        setSelectId(id);
    }

    const onSubmit = (e)=>{
        setNamesList([]);
        e.preventDefault();
        let names=[];

        //  mentors.map((item) => {
        //     if(item._id.toString() === selectId){
        //         names = item.students_list;
        //         setNamesList(names);
        //     }
        // })

        mentors.map((item) => {
            if(item._id.toString() === selectId){
                names = item.students_list;
                setNamesList(names);
            }
        })
}


    return(
        <form className="container mt-5 m-auto d-flex flex-column" onSubmit={onSubmit}>

            <div className="d-flex">
            <div className="fw-bold mt-1">See Students for:</div>
            <div><select className="form-select mx-3" id="mentor" name="mentor" value={selectId} onChange={handleChange}>
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
           

            {namesList? <div className="mt-5 d-flex flex-column align-items-start">
            {namesList.map((name,index) => {
                    return <li key={index}>{`${name}`}</li>
                })}
            </div>:<div className="d-flex mt-5 justify-content-start">No Student Assigned</div>}
            
            
            
        </form>
    )
}

export default ShowStudentsOfMentor;