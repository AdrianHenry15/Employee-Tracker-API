INSERT INTO departments (name)
VALUES
('Engineering & Technology'), 
('Sales, Service & Support'), 
('Marketing & Communications');


INSERT INTO roles (title, salary, department_id)
VALUES
('Software Engineer', 70000, 1),
('Product Manager', 50000, 2),
('Sales Engineer', 42000, 1),
('Technical Program Manager', 52000, 3),
('Technical Solutions', 56000, 1),
('Electrical Engineer', 67000, 1),
('Test Engineer', 78000, 1),
('Network Engineer', 74000, 3),
('Sourcing/Supply Chain', 52000, 2),
('Systems Integrator', 65000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Ronald', 'Firbank', 9, NULL),
  ('Virginia', 'Woolf', 7, NULL),
  ('Piers', 'Gaveston', 6, NULL),
  ('Charles', 'LeRoi', 8, NULL),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 3, 3),
  ('Edward', 'Bellamy', 1, 2),
  ('Montague', 'Summers', 4, 3),
  ('Octavia', 'Butler', 2, 1),
  ('Unica', 'Zurn', 10, 4);