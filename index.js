const inquirer = require('inquirer');
const {query} = require('./queries');

async function start() {
    const answers = await inquirer.prompt([
{
        type: 'list',
        name: 'action',
        message: 'What is next?',
        
        choices: [
            'All Departments',
            'All Roles',
            'All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit',
        ]
          }
]);

switch (answers.action){
    case 'All Departments':
      const departments = await query('SELECT * FROM department');
      console.table(departments.rows);
      break;

    case 'All Roles':
      const roles = await query('SELECT * FROM role');
      console.table(roles.rows);
      break;

    case 'All Employees':
      const employees = await query('SELECT * FROM employees');
      console.table(employees.rows);
      break;

    case 'Add Department':
      await addDepartment();
      break;

    case 'Add Role':
      await addRole();
      break;

    case 'Add Employee':
      await addEmployee();
        break;

    case 'Update Employee Role':
     await updateEmployee();
      break;
     
      case 'Exit': 
      process.exit(0);

    default:
      console.log('');
      console.log('Failed');
      console.log(''); 
     break;
  }
  

  await start();
};

start();

// Josh Stringer helped with this part of adding new areas and insert values to them

async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartmentName',
      message: 'Enter new department:'
    }
  ]);
  await query('INSERT INTO department (name) VALUES ($1)', [answer.newDepartmentName]);
  console.log('Department Added');
}

async function updateEmployee() {

  const existingEmployee = await query('SELECT * FROM employee');

  const employeeChoice = existingEmployee.rows.map(emp => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));

  const existingRoles = await query('SELECT * FROM role');

  const employeeRoleChoice = existingRoles.rows.map(role => ({
    name: role.title,
    value: role.id
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeName',
      message: 'Choose employee:',
      choices: employeeChoice
    },
    {
      type: 'list',
      name: 'employeeRole',
      message: 'Choose new role:',
      choices: employeeRoleChoice
    }
  ]);

  await query('UPDATE employee SET role_id = $2 WHERE id = $1', [answer.employeeName, answer.employeeRole]);
  console.log('Employee Role Updated');
}
