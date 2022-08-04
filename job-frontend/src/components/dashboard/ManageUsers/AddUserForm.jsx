import React from "react";
import classes from "./AddUserForm.module.css";
import { useRef } from "react";

const AddUserForm = (props) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const mobileInputRef = useRef();
  const dobInputRef = useRef();
  const genderInputRef = useRef();
  const qualificationInputRef = useRef();
  const experienceInputRef = useRef();
  const roleInputRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const userData = {
      enteredName: nameInputRef.current.value,
      enteredEmail: emailInputRef.current.value,
      enteredPassword: passwordInputRef.current.value,
      enteredMobile: passwordInputRef.current.value,
      enteredDOB: dobInputRef.current.value,
      enteredGender: genderInputRef.current.value,
      enteredQualification: qualificationInputRef.current.value,
      enteredExperience: experienceInputRef.current.value,
      enteredRole: roleInputRef.current.value,
    };
  };

  return (
    <div className={classes.main}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.formInputs}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" ref={nameInputRef} />
        </div>
        <div className={classes.formInputs}>
          <label htmlFor="email">Email</label>
          <input type="email" id="name" name="email" ref={emailInputRef} />
        </div>
        <div className={classes.formInputs}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.formInputs}>
          <label htmlFor="mobile">Mobile No</label>
          <input type="text" id="mobile" name="mobile" ref={mobileInputRef} />
        </div>
        <div className={classes["formInputs__side"]}>
          <div className={classes["formInputs__side__inner"]}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dateOfBirth" id="dob" ref={dobInputRef} />
          </div>
          <div className={classes["formInputs__side__inner"]}>
            <label>Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                id="Male"
                ref={genderInputRef}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="Female"
                ref={genderInputRef}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className={classes["formInputs__side"]}>
          <div className={classes["formInputs__side__inner"]}>
            <label htmlFor="qualification">Qualification</label>
            <select
              name="qualification"
              id="qualification"
              ref={qualificationInputRef}
            >
              <option value="">select</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Diploma">Diploma</option>
              <option value="High School">High School</option>
            </select>
          </div>
          <div className={classes["formInputs__side__inner"]}>
            <label htmlFor="experience">Experience</label>
            <select name="experience" id="experience" ref={experienceInputRef}>
              <option value="">select</option>
              <option value="0-2">0-2</option>
              <option value="3-7">3-7</option>
              <option value="7-10">7-10</option>
              <option value="10-50">10-50</option>
            </select>
          </div>
        </div>
        <div className={classes.formInputs}>
          <label htmlFor="role">Role</label>
          <select name="role" id="role" ref={roleInputRef}>
            <option value="Job Provider">Job Provider</option>
            <option value="User">User</option>
          </select>
        </div>
        <button className={classes.submitBtn} type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
