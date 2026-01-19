import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  gender: Yup.string().required(),

  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "Employee must be at least 18 years old", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18 && age <= 70;
    }),

  state: Yup.string().required("State selection is required"),

  active: Yup.boolean(),
});


const EmployeeFormModal = ({ show, onHide, employee, onSave, states }) => {
  const [preview, setPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (show && employee?.image) {
      setPreview(employee.image);
    }
    if (!show) {
      setPreview("");
      setSuccessMessage("");
    }
  }, [show, employee]);

  const handleImageChange = (e, setFieldValue, setErrors, errors) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, image: "Invalid image type" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image must be under 5MB" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (setFieldValue) => {
    setPreview("");
    setFieldValue("image", "");
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {employee ? "✏️ Edit Employee" : "➕ Add New Employee"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={{
          name: employee?.name || "",
          gender: employee?.gender || "Male",
          dob: employee?.dob || "",
          state: employee?.state || "",
          active: employee?.active ?? true,
          image: employee?.image || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSave({ ...values, image: preview || values.image });
          toast.success(
            employee
              ? "Employee updated successfully 🎉"
              : "Employee added successfully 🎉",
            {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
            }
          );
          setTimeout(() => {
            resetForm();
            setPreview("");
            onHide();
          }, 800);
        }}

      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          setErrors,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Modal.Body className="p-4">
              {/* {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )} */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Full Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">🧑 Male</option>
                      <option value="Female">👩 Female</option>
                    </Form.Select>

                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Date of Birth <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      isInvalid={touched.dob && !!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  State <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={touched.state && !!errors.state}
                >
                  <option value="">Select a state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Profile Image (Optional)
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(
                      e,
                      setFieldValue,
                      setErrors,
                      errors
                    )
                  }
                />

                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "4px solid #667eea",
                      }}
                    />
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleRemoveImage(setFieldValue)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                )}
              </Form.Group>
              <Form.Check
                type="checkbox"
                label={
                  values.active
                    ? "✅ Active Employee"
                    : "❌ Inactive Employee"
                }
                checked={values.active}
                onChange={(e) =>
                  setFieldValue("active", e.target.checked)
                }
                className="fw-semibold mb-3"
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  resetForm();
                  setPreview("");
                  onHide();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
              >
                {employee ? "Update" : "Add"} Employee
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EmployeeFormModal;
