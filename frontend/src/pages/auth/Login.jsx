import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "../../config";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../../store/authSlice";
const initialState = {
  email: "",
  password: "",
};
function Login() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
        // if (data.payload.user.role === "admin") {
        //   navigate("/admin/dashboard");
        // } else {
        //   navigate("/shop/home");
        // }
      } else {
        toast.error(data?.payload?.message);
      }
    });
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
