const inquirer = require('inquirer');
const queries = require('./queries');

const start = async () => {
    const answers = await inquirer.prompt({

        loop: false,
        type: 'list',
        name: 'action',
        message: 'What is nexted?',
        
        choices: [
            'All Departments',
            'All Roles',
            'All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit',
        ],
});

switch (answers.action){
    case 'View All Departments':
      const departments = await queries.viewDepartments();
      start();
      break;

    case 'View All Roles':
      const roles = await queries.viewRoles();
      start();
      break;

    case 'View All Employees':
      const employees = await queries.viewEmployees();
      start();
      break;

    case 'Add Department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter name of the department you would like to add',
      });
      await queries.addDepartment(departmentName);
      console.log('Department has been added');
      start();
      break;

    case 'Add a role':
      const departmentArr = await queries.viewDepartments()
  
      const departmentChoices = departmentArr.map(dept => {
        return { 
          name: dept.name,
          value: dept.id
        }
      })
      console.log("Choices: ", departmentChoices)

      const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the role title',
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary',
        },
       
        {
          type: 'list',
          name: 'departmentId',
          message: 'Enter department ID for this role',
          choices: departmentChoices
        },
      ]);
      await queries.addRole(roleTitle, roleSalary, departmentId);
      console.log('Role has been added');
      start();
      break;

    case 'Add an employee':
      try {
        let { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee first name:',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee last name:',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for the employee:',
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID (if applicable):',
         
          },
        ]);
       
       if(managerId == 'null' || managerId == 0 || managerId == 'NULL' || managerId == 'Null') {
          managerId = null;
        }
        await queries.addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added.');
        start();
        break;
        
      } catch (error) {
        console.log("Err: ", error);
      }

    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the employee ID being updated',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the updated role ID',
        },
      ]);
      await queries.updateRole(employeeId, newRoleId);
      console.log('New employee role updated.');
      start();
      break;
     
      case 'Quit': quit(); break;

    default:
     quit()
  }
  

 
};
 start();

  function quit() {
    process.exit();
  }