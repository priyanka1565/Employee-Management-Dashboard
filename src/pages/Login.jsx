import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { login } from "../utils/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (values?.email !== "Sunil@123" || values?.password !== "123456") {
      toast.error("Invalid username or password")
      return
    }
    setLoading(true);
    localStorage.setItem("is_user", true);
    setTimeout(() => {
      login();
      toast.success("Login successful");

      resetForm();
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "32px",
            borderRadius: "8px",
          }}
        >
          <div className="text-center mb-4">
            <h3 className="fw-bold">Welcome Back</h3>
            <p className="text-muted">Sign in to your account</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={
                        touched.password && !!errors.password
                      }
                    />
                    <InputGroup.Text
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                  style={{
                    padding: "12px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
