INSERT INTO department(name)
VALUES
('Engineering & Technology'), 
('Sales, Service & Support'), 
('Marketing & Communications'),
('Design'),
('Business Strategy'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Software Engineer', 70000, 123),
('Product Manager', 50000, 156),
('Sales Engineer', 42000, 167),
('Technical Program Manager' 52000, 198),
('Technical Solutions', 56000, 167),
('Electrical Engineer', 67000, 176),
('Test Engineer', 78000, 145),
('Network Engineer', 74000, 118),
('Sourcing/Supply Chain', 52000, 112),
('Systems Integrator', 65000, 187),;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 1, 1);;