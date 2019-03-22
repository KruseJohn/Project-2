## Hound Around Town
Hound Around Town is an application created to keep track of customers who own dogs and manage drivers who shuttle these pets to different locations. The application also allows new drivers to inquire to become an approved driver for the company.  

## Motivation
Many companies are moving to a remote workforce. With this comes the demand for teams to keep track of tasks and customers on a remote platform. This application in particular fills the need presented by Hounds Around Town,  but the application can be customized to fit any businesses unique model. 
 
## Video
https://drive.google.com/file/d/1MNb_mTTFn5ALu2V_TqQ5s5MnEpwXWGjH/view?usp=sharing

## Tech/framework used
<b>HTML</b>
- [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML)
<b>CSS</b>
- [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS)
<b>Javascript</b>
- [Javascript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript)
<b>Mysql</b>
- [Mysql](https://www.mysql.com/)
<b>Sequelize</b>
- [Sequelize](https://www.npmjs.com/package/sequelize)
<b>Node.js</b>
- [Node.js](https://nodejs.org/en/)
<b>Express</b>
- [Express](https://www.npmjs.com/package/express)
<b>SweetAlert2</b>
- [SweetAlert2](https://sweetalert2.github.io/)
<b>Heroku</b>
- [Heroku](https://www.heroku.com/home)


## Features
This is an easy to use application that can be customized for any need. 

## Code Example
Function for creating a new list row for drivers:

function createDriverRow(driverData) {
    var newTr = $("<tr>");
    newTr.data("driver", driverData);
    newTr.append("<td>" + driverData.name + "</td>");
    newTr.append("<td>" + driverData.email + "</td>");
    newTr.append("<td>" + driverData.availability + "</td>");
    newTr.append(
      "<td><a href='/dcs?driver_id=" +
        driverData.id +
        "'>Driver Credentials</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-driver'>Delete Driver</a></td>"
    );
    return newTr;
  }

## Heroku
https://still-falls-13871.herokuapp.com/

#### Authors
TEAM7UP


## License
MIT © [Team7up]()