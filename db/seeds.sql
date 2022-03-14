INSERT INTO departments (name)
VALUES
('Engineering & Technology'), 
('Sales, Service & Support'), 
('Marketing & Communications'),
('Design'),
('Business Strategy'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary)
VALUES
('Software Engineer', 70000),
('Product Manager', 50000),
('Sales Engineer', 42000),
('Technical Program Manager', 52000),
('Technical Solutions', 56000),
('Electrical Engineer', 67000),
('Test Engineer', 78000),
('Network Engineer', 74000),
('Sourcing/Supply Chain', 52000),
('Systems Integrator', 65000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
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
  ('Unica', 'Zurn', 1, 1);