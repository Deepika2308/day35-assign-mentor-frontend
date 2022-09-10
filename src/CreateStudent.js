import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import {API} from "./global.js";

// creating student form
export function CreateStudent() {

  let [show, setShow] = useState(false);
  let [modalMsg, setModalMsg] = useState("");
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { name: "", profile: "", batch: "", week: "", course: "", email: "", mobile: "" },
    onSubmit: (values) => {
      fetch(`${API}/create-student`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty('error')) {
            setShow(true);
            setModalMsg(data.error);
          }
          else if (data.result.hasOwnProperty(`acknowledged`)) {
            setShow(true);
            setModalMsg("Student created successfully");
          }
        });
    }
  });

  return (
    <div className="container-lg mt-4">
      <h3 className="mb-4">Create student Form</h3>
      <form className="create-student-form d-flex flex-column gap-4 mt-5 mb-5 w-75 m-auto" onSubmit={formik.handleSubmit}>
        <input type="text" id="name" name="name" placeholder="Name" className="form-control" value={formik.values.name} onChange={formik.handleChange}></input>

        <div className="profile d-flex gap-3">
          <label className="fw-bold text-start">Profile: </label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="student" id="student" name="profile" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="student">Student</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" value="professional" id="professional" name="profile" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="professional">professional</label>
          </div>
        </div>

        <input type="text" id="batch" name="batch" placeholder="Batch" className="form-control" value={formik.values.batch} onChange={formik.handleChange}></input>

        <div className="week d-flex gap-3">
          <label className="fw-bold text-start">Week: </label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="weekdays" id="weekdays" name="week" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="weekdays">Week Days</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" value="weekends" id="weekends" name="week" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="weekends">Weekends</label>
          </div>
        </div>

        <select className="form-select" id="course" name="course" aria-label="course" value={formik.values.course} onChange={formik.handleChange}>
          <option value="javascript">Javascript</option>
          <option value="full stack">Full Stack</option>
          <option value="aws">AWS</option>
          <option value="cloud">Cloud</option>
          <option value="php">PHP</option>
          <option value="html css">HTML,CSS</option>
        </select>

        <input type="text" id="email" name="email" placeholder="Email ID" className="form-control" value={formik.values.email} onChange={formik.handleChange}></input>

        <input type="text" id="mobile" name="mobile" placeholder="Mobile Number" className="form-control" value={formik.values.mobile} onChange={formik.handleChange}></input>

        <div className="d-flex flex-column gap-2 align-items-center">
          <button className="btn btn-warning col-lg-3" type="submit">Create</button>
          <button className="btn btn-secondary mt-4 col-lg-3" type="button" onClick={() => navigate("/")}>Home</button>
        </div>

        <Modal show={show}>
          <Modal.Body>
            <p>{modalMsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" aria-label="Close" onClick={() => setShow(!show)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>

      </form>


    </div>
  );
}
