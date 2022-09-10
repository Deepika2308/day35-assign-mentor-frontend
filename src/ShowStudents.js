import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

//assign student dropdown
//dropdown will filter students who has not been assigned any mentor yet
export function ShowStudents({ students, mentor }) {
  let [show, setShow] = useState(false);
  let [msg, setMsg] = useState("");
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { students_list: [] },
    onSubmit: (values) => {
      //api call to assign students to mentor to metor record
      fetch(`http://127.0.0.1:4300/assign-students/${mentor}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      })
        .then(response => response.json())
        .then(data => {
          if (data.acknowledged) {
            setShow(true);
            setMsg("Student assigned successfully");
          }
          else {
            setShow(true);
            setMsg("Error in assigning student");
          }
        });

      //api call to assign mentor to the selected students record
      values.students_list.map((student) => {
        let obj = {
          'mentor': mentor
        };
        fetch(`http://127.0.0.1:4300/assign-mentor/${student}`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: { "content-type": "application/json" },
        });
      });
    }
  });
  return (
    <div>
      <form className="mt-3 w-50 m-auto" onSubmit={formik.handleSubmit}>
        <div className="fw-bold">Assign Students:</div>
        <select className="form-select" id="students_list" name="students_list" value={formik.values.students_list} onChange={formik.handleChange} multiple>
          {students.map((stud, index) => {
            return <OverlayTrigger key={index}
              trigger={["hover", "focus"]}
              placement="right"
              overlay={<Popover id="popover-basic">
                <Popover.Body>
                  <div>
                    <div>{`${stud.profile}`}</div>
                    <div>{`${stud.batch} - ${stud.week}`}</div>
                    <div>{`${stud.course}`}</div>
                  </div>
                </Popover.Body>
              </Popover>}
            >
              <option value={stud._id}>{`${stud.name}`}</option>
            </OverlayTrigger>;
          })}
        </select>

        {/* show success message after assignment */}
        {show ? <div className="text-success">{msg}</div> : ""}

        <div className="d-flex flex-column gap-2 align-items-center">
          <button className="btn btn-primary mt-4" type="submit">Assign</button>
          <button className="btn btn-primary mt-4" type="button" onClick={() => navigate("/")}>Home</button>
        </div>
      </form>
    </div>
  );
}
