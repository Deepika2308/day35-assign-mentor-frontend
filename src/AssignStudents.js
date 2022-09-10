import { useState, useEffect } from 'react';
import { Topics } from './Topics';
import { Languages } from './Languages';
import { ShowStudents } from './ShowStudents';
import {API} from "./global.js";

//assign students to mentor form
export function AssignStudents() {

  let [mentors, setMentors] = useState([]);
  let [mentor, setMentor] = useState("");
  let [topics, setTopics] = useState([]);
  let [languages, setLanguages] = useState([]);
  let [students, setStudents] = useState([]);

  function handleChange(event) {
    setTopics([]);
    setLanguages([]);
    let mentor_id = event.nativeEvent.target.selectedOptions[0].value;
    setMentor(mentor_id);

    // get the topics and languages of a particular mentor
    if (mentor_id !== "selectMentor") {
      fetch(`${API}/mentor/${mentor_id}`)
        .then(response => response.json())
        .then(data => {
          setTopics(data.topics);
          setLanguages(data.languages);
        });
    }


  }


  useEffect(() => {
    fetch(`${API}/mentors`)
      .then(response => response.json())
      .then(data => {
        setMentors(data);
      });

    //filter students who has not been assigned any mentor yet
    fetch(`${API}/students`)
      .then(response => response.json())
      .then(data => {
        let filteredStudents = data.filter((obj) => {
          return !obj.hasOwnProperty('mentor');
        });
        setStudents(filteredStudents);
      });

  }, [mentor]);

  return (
    <div className="container mt-4">
      <h3>Assign students to mentors</h3>
      <div className="container d-flex flex-column gap-4 w-50 mx-auto my-5">
        <select className="form-select" id="mentors" name="mentors" value={mentor} onChange={handleChange}>
          <option value="selectMentor">Select Mentor</option>
          {mentors.map((mentor, index) => {
            return <option value={mentor._id} key={index}>{`${mentor.name}`}</option>;
          })}
        </select>

        {/* show topics and languages for entor once clicked on the drop down */}
        {topics.length > 0 ? <Topics topics={topics} /> : ""}
        {languages.length > 0 ? <Languages languages={languages} /> : ""}
        {languages.length > 0 ? <ShowStudents students={students} mentor={mentor} /> : ""}

      </div>
    </div>
  );
}
