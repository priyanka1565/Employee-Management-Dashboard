import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  InputGroup
} from 'react-bootstrap';
import EmployeeFormModal from '../components/EmployeeForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      dob: '1990-05-15',
      state: 'California',
      active: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      gender: 'Female',
      dob: '1992-08-22',
      state: 'Texas',
      active: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      gender: 'Male',
      dob: '1988-03-10',
      state: 'India',
      active: false,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    }
  ]);

  const user = localStorage.getItem("is_user") ?? false;
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const states = [
    'California', 'Texas', 'Florida', 'New York',
    'Pennsylvania', 'Illinois', 'Ohio', 'Georgia',
    'North Carolina', 'Michigan'
  ];

  const handleAddEmployee = (formData) => {
    const newEmployee = {
      id: Math.max(...employees.map((e) => e.id), 0) + 1,
      ...formData
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleEditEmployee = (formData) => {
    setEmployees(
      employees.map((e) =>
        e.id === editingEmployee.id ? { ...editingEmployee, ...formData } : e
      )
    );
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=900');
    const html = `
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 30px;
              background: white;
            }
            h1 {
              text-align: center;
              color: #667eea;
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px;
              text-align: left;
              font-weight: bold;
            }
            td {
              border: 1px solid #ddd;
              padding: 10px;
            }
            tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            tbody tr:hover {
              background-color: #f0f0f0;
            }
            .status-active {
              color: #4ba251;
              font-weight: bold;
            }
            .status-inactive {
              color: #d85a5a;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Employee List Report</h1>
          <p><strong>Total Employees:</strong> ${filteredEmployees.length}</p>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
        .map(
          (e) => `
                <tr>
                  <td>${e.id}</td>
                  <td>${e.name}</td>
                  <td>${e.gender}</td>
                  <td>${e.dob}</td>
                  <td>${e.state}</td>
                  <td class="${e.active ? 'status-active' : 'status-inactive'}">
                    ${e.active ? 'Active' : 'Inactive'}
                  </td>
                </tr>
              `
        )
        .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  const logout = () => {
    localStorage.removeItem("is_user");
    navigate("/login")
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = !filterGender || emp.gender === filterGender;
    const matchesStatus =
      !filterStatus || (filterStatus === 'active' ? emp.active : !emp.active);
    return matchesSearch && matchesGender && matchesStatus;
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user])


  return (
    <div
      style={{
        background: '#f8f9fa',
        minHeight: '100vh',
        paddingTop: '24px',
        paddingBottom: '24px'
      }}
    >
      <Container>
        <Row className="g-4 mb-4">
          <Col lg={4} md={6} xs={12}>
            <Card className="text-white shadow border-0 h-100" style={{ background: '#ead666ff' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-white-50">Total Employees</small>
                    <h2 className="fw-bold mt-2">{totalEmployees}</h2>
                  </div>
                  <div className="fs-1">👥</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} xs={12}>
            <Card className="text-white shadow border-0 h-100" style={{ background: '#4ba251ff' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-white-50">Active Employees</small>
                    <h2 className="fw-bold mt-2">{activeEmployees}</h2>
                  </div>
                  <div className="fs-1">✓</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} xs={12}>
            <Card className="text-white shadow border-0 h-100" style={{ background: '#d85a5aff' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-white-50">Inactive Employees</small>
                    <h2 className="fw-bold mt-2">{inactiveEmployees}</h2>
                  </div>
                  <div className="fs-1">✕</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="mb-4 border-0 shadow">
          <Card.Body>
            <Row className="g-3 mb-3">
              <Col xs={12}>
                <InputGroup>
                  <InputGroup.Text style={{ background: '#667eea', color: 'white', border: 'none' }}>
                    🔍
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by employee name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6} xs={12}>
                <Form.Select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Col>
              <Col md={6} xs={12}>
                <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row className="align-items-center mb-3">
          <Col>
            <h5 className="fw-bold mb-0">Employee List</h5>
          </Col>
          <Col xs="auto" className="d-flex gap-2 flex-wrap">
            <Button
              className="fw-semibold shadow"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white'
              }}
              onClick={() => {
                setShowForm(true);
              }}
            >
              ➕ Add Employee
            </Button>
            <Button
              className="fw-semibold shadow"
              variant="outline-primary"
              onClick={handlePrint}
            >
              🖨️ Print
            </Button>
            <Button
              className="fw-semibold shadow"
              variant="outline-primary"
              onClick={logout}
            >
              Logout
            </Button>
          </Col>
        </Row>
        {filteredEmployees.length === 0 ? (
          <Card className="text-center shadow border-0">
            <Card.Body className="py-5">
              <div className="display-4 mb-3">👥</div>
              <h4 className="fw-bold">No employees found</h4>
              <p className="text-muted mb-4">
                {employees.length === 0
                  ? 'Start by adding your first employee to manage records efficiently.'
                  : 'Try adjusting your search or filter criteria.'}
              </p>
              {employees.length === 0 && (
                <Button
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    color: 'white'
                  }}
                  className="fw-semibold"
                  onClick={() => {
                    setEditingEmployee(null);
                    setShowForm(true);
                  }}
                >
                  ➕ Add Your First Employee
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Card className="shadow border-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th className="fw-bold">ID</th>
                    <th className="fw-bold">Image</th>
                    <th className="fw-bold">Name</th>
                    <th className="fw-bold">Gender</th>
                    <th className="fw-bold">DOB</th>
                    <th className="fw-bold">State</th>
                    <th className="fw-bold">Status</th>
                    <th className="fw-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="fw-semibold">{emp.id}</td>
                      <td>
                        <img
                          src={emp.image}
                          alt={emp.name}
                          style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #667eea'
                          }}
                        />
                      </td>
                      <td>{emp.name}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.state}</td>
                      <td>
                        <Badge
                          bg={emp.active ? 'success' : 'danger'}
                          className="fw-semibold"
                        >
                          {emp.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => {
                            setEditingEmployee(emp);
                            setShowForm(true);
                          }}
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDeleteEmployee(emp.id)}
                        >
                          🗑️ Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        )}
      </Container>
      <EmployeeFormModal
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingEmployee(null);
        }}
        employee={editingEmployee}
        onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
        states={states}
      />
    </div>
  );
}
export default Dashboard;