import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Contextapi } from "../../Authprovider/Authprovider";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// import imagegoogle from '../../assets/google_2913970.png'

const Register = () => {
  const { registerwithemailpass } = useContext(Contextapi);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  console.log("upazila", upazila, district);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photurl = e.target.url;
    const confirmPassword = e.target.confirm_password.value;

    // const file = photurl.files[0];

    const bloodgrp = e.target.bloodgrp.value;
    console.log(bloodgrp);
    // return

    if (password !== confirmPassword) {
      return alert("Password and Confirm Password do not match");
    }

    if (!/[A-Z]/.test(password)) {
      return alert("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return alert("Password must contain at least one lowercase letter.");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }

    // img api
    // const res = await axios.post(
    //   `https://api.imgbb.com/1/upload?expiration=600&key=f382280471f6aa436340fe3333c9fa58`,
    //   { image: file },
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );

    // const selectedurl = res.data.data.display_url;

    // console.log(res.data);

    const file = photurl.files[0];

    const imageData = new FormData();
    imageData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=f382280471f6aa436340fe3333c9fa58`,
      imageData
    );

    const selectedurl = res.data.data.display_url;

    const formData = {
      email,
      name,
      photoURL: selectedurl,
      bloodgrp,
      district,
      upazila,
    };

    if (res.data.success == true) {
      registerwithemailpass(email, password)
        .then((result) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: selectedurl,
          })
            .then(() => {
              navigate("/");
              toast("registration done");
              console.log("hello", result.user);
              axiosSecure
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log("resgid", res);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              toast("Something went wrong", error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const handlegooglesignin = () => {
  //   signinwithgoogle()
  //     .then((result) => {
  //       const user = result.user;
  //       console.log("uer", user);
  //       setUser(user);
  //       toast("Logged in successfully hihi");

  //       navigate(location.state?.from || "/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast('error')
  //     });
  // };

  return (
    <div className="flex flex-col justify-center items-center my-32">
      <title>Register</title>

      <form onSubmit={handlesubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">User Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Your User Name"
          />
          <label className="label">Photo URL</label>
          <input
            name="url"
            type="file"
            className="input"
            placeholder="Photo url"
          />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />

          <label className="label">Confirm Password</label>
          <input
            name="confirm_password"
            type="password"
            className="input"
            placeholder="Confirm Password"
          />

          <select
            name="bloodgrp"
            defaultValue="Select your blood group"
            className="select"
          >
            <option value="" disabled selected>
              Select blood group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
          </select>
          <select
            value={upazila}
            onChange={(e) => {
              setUpazila(e.target.value);
            }}
            defaultValue="Select your upazila"
            className="select"
          >
            <option value="" disabled selected>
              Select Upazila
            </option>
            {upazilas.map((upazila) => (
              <option>{upazila?.name}</option>
            ))}
          </select>
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
            defaultValue="Select your district"
            className="select"
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districts.map((district) => (
              <option>{district?.name}</option>
            ))}
          </select>

          {/* <button
            type="button"
            onClick={() => handlegooglesignin()}
            className="btn"
          >
             <img className="h-5" src={imagegoogle} alt="" />
            Sign in with google
          </button> */}
          <button className="btn btn-neutral mt-4">Register</button>
          <p>
            Have an Account?{" "}
            <Link className="text-green-900" to="/login">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
