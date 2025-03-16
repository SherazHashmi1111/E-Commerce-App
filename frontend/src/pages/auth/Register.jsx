import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerFormControls } from "../../config";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { toast } from "sonner"

const initialState = {
  userName: "",
  email: "",
  password: "",
};
function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit (e){
    e.preventDefault();
    
    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast(data?.payload?.message)
        navigate('/auth/login')}else{
          toast.error(data?.payload?.message)
        }
    });
    
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold  tracking-tight text-foreground">
          Sign Up
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default Register;
