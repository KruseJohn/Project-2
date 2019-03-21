$(document).ready(function() {
  // Getting references to the name input and driver container, as well as the table body
  var nameInput = $("#driver-name");
  var emailInput = $("#driver-email");
  var dayAvailable = $("#driver-avail");
  var driverList = $("tbody");
  var driverContainer = $(".driver-container");
  // Adding event listeners to the form to create a new object, and the button to delete a Driver
  $(document).on("submit", "#driver-form", handleDriverFormSubmit);
  $(document).on("click", ".delete-driver", handleDeleteButtonPress);

  // Getting the initial list of Drivers
  getDrivers();

  // A function to handle what happens when the form is submitted to create a new Driver
  function handleDriverFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name and date fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim() ||
      !emailInput
        .val()
        .trim()
        .trim() ||
      !dayAvailable
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertDriver function and passing in the value of the name, email, availability input
    upsertDriver({
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      availability: dayAvailable.val().trim()
    });
  }

  // A function for creating an driver. Calls driver upon completion
  function upsertDriver(driverData) {
    $.post("/api/drivers", driverData).then(getDrivers);
  }

  // Function for creating a new list row for drivers
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

  // Function for retrieving drivers and getting them ready to be rendered to the page
  function getDrivers() {
    $.get("/api/drivers", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createDriverRow(data[i]));
      }
      $("#numberOfDrivers").html("Drivers (Total: " + data.length + ")");
      renderDriverList(rowsToAdd);
      nameInput.val("");
      $("#driver-email").val("");
      $("#driver-avail").val("");
    });
  }

  // A function for rendering the list of drivers to the page
  function renderDriverList(rows) {
    driverList
      .children()
      .not(":last")
      .remove();
    driverContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      driverList.prepend(rows);
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.css({
        width: "610px"
      });
      alertDiv.text(
        "All Drivers must be certified, insured, and have passed our extensive screening process!"
      );
      driverContainer.append(alertDiv);
    }
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("driver");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/drivers/" + id
    }).then(getDrivers);
  }
});
