INSERT INTO department (name) values
('Director'),
('Manager In Charge'),
('Associate');

INSERT INTO role (title, salary, department_id) values
('Unit Director', '90000', '1'),
('MIC', '70000', '2'),
('Assistant Manager', '40000', '2'),
('Lead', '20000', '3'),
('Shopper', '10000', '3');


INSERT INTO employee (first_name, last_name, role_id, manager_id) values
('Jim', 'Stout', '1', '1'),
('Mando', 'Garcia', '2', '2'),
('Damian', 'De La Paz', '2', '2'),
('Trista', 'Gonzalez', '3', '3'),
('Miranda', 'Cortez', '3', '3');