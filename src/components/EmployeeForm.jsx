import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  InputGroup,
  Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const EmployeeFormModal=({ show, onHide, employee, onSave, states }) =>{
  const [formData, setFormData] = useState(
    employee || {
      name: '',
      gender: 'Male',
      dob: '',
      state: '',
      active: true,
      image: ''
    }
  );
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(employee?.image || '');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.state) newErrors.state = 'State is required';
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setFormData(
      employee || {
        name: '',
        gender: 'Male',
        dob: '',
        state: '',
        active: true,
        image: ''
      }
    );
    setErrors({});
    setPreview(employee?.image || '');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {employee ? '✏️ Edit Employee' : '➕ Add New Employee'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              isInvalid={!!errors.name}
              placeholder="Enter full name"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  isInvalid={!!errors.dob}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">State</Form.Label>
            <Form.Select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              isInvalid={!!errors.state}
            >
              <option value="">Select a state</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    height: '100px',
                    width: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #667eea'
                  }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Active Employee"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="flex-grow-1 fw-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-grow-1 fw-semibold"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white'
              }}
            >
              {employee ? 'Update' : 'Add'} Employee
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default EmployeeFormModal;