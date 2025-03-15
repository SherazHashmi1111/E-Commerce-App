import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "../../config";
import CommonForm from "../../components/common/form";

const initialState = {
  email: "",
  password: "",
};
function Login() {
  const [formData, setFormData] = useState(initialState);
  function onSubmit (){
    
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold  tracking-tight text-foreground">
          Log In
        </h1>
        <p className="mt-2">
          Dont have an Account?{" "}
          <Link
            to={"/auth/register"}
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default Login;
