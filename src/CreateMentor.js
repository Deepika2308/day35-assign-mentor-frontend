import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';

export function CreateMentor() {

  let [show, setShow] = useState(false);
  let [modalMsg, setModalMsg] = useState("");
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { name: "", topics: [], languages: [], qualification: "", email: "", mobile: "" },
    onSubmit: (values) => {
      //  calling api to store mentor details into db
      fetch("http://127.0.0.1:4300/create-mentor", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.hasOwnProperty('error')) {
            setShow(true);
            setModalMsg(data.error);
          }
          else if (data.result.hasOwnProperty(`acknowledged`)) {
            setShow(true);
            setModalMsg("Metor created successfully");
          }

        });
    }
  });


  return (
    <div className="container-lg mt-4">
      <h3 className="mb-4">Create Mentor Form</h3>
      <form className="create-mentor-form d-flex flex-column gap-4 mt-5 mb-5 w-75 m-auto" onSubmit={formik.handleSubmit}>
        <input type="text" id="name" name="name" placeholder="Name" className="form-control" value={formik.values.name} onChange={formik.handleChange}></input>

        {/* checkbox for topics assuming one mentor can take more than 1 topic */}
        <div role="group" className="topics d-flex flex-column align-items-start gap-3">
          <label className="fw-bold text-start">Topics: </label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="JAVASCRIPT" name="topics" value="Javascript" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="javascript">Javascript</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="HTML_CSS" name="topics" value="Html,Css" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="HTML_CSS">HTML and CSS</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="REACT_NODE_MONGO" name="topics" value="React,Node,Mongo" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="REACT_NODE_MONGO">React,Node,MongoDB</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="Data_Structures" name="topics" value="Data Structures" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="Data_Structures">Data structures</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="AWS" name="topics" value="AWS" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="AWS">AWS</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="system_design" name="topics" value="System Design" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="system_design">System Design</label>
          </div>

        </div>

        {/* checkbox for languages assuming one mentor can speak more than 1 */}
        <div role="group" className="languages d-flex gap-3">
          <label className="fw-bold text-start">Spoken Languages: </label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="English" name="languages" value="English" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="English">English</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="Tamil" name="languages" value="Tamil" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="Tamil">Tamil</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="Hindi" name="languages" value="Hindi" onChange={formik.handleChange}></input>
            <label className="form-check-label" htmlFor="Hindi">Hindi</label>
          </div>
        </div>

        <input type="text" id="qualification" name="qualification" placeholder="Qualification" className="form-control" value={formik.values.qualification} onChange={formik.handleChange}></input>

        <input type="email" id="email" name="email" placeholder="Email ID" className="form-control" value={formik.values.email} onChange={formik.handleChange}></input>

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
