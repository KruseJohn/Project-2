$(document).ready(function() {
  // Getting references to the name input and owner container, as well as the table body
  var nameInput = $("#driver-name");
  var emailInput = $("#driver-email");
  var dayAvailable = $("#driver-avail");
  var ownerList = $("tbody");
  var ownerContainer = $(".owner-container");
  // Adding event listeners to the form to create a new object, and the button to delete a Driver
  $(document).on("submit", "#owner-form", handleOwnerFormSubmit);
  $(document).on("click", ".delete-owner", handleDeleteButtonPress);

  // Getting the initial list of Drivers
  getOwners();

  // A function to handle what happens when the form is submitted to create a new Driver
  function handleOwnerFormSubmit(event) {
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
    // Calling the upsertOwner function and passing in the value of the name, email, availability input
    upsertOwner({
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      availability: dayAvailable.val().trim()
    });
  }

  // A function for creating an driver. Calls getOwners upon completion
  function upsertOwner(ownerData) {
    $.post("/api/owners", ownerData).then(getOwners);
  }

  // Function for creating a new list row for drivers
  function createOwnerRow(ownerData) {
    var newTr = $("<tr>");
    newTr.data("owner", ownerData);
    newTr.append("<td>" + ownerData.name + "</td>");
    newTr.append("<td>" + ownerData.email + "</td>");
    newTr.append("<td>" + ownerData.availability + "</td>");
    newTr.append(
      "<td><a href='/cms?owner_id=" +
        ownerData.id +
        "'>Driver Credentials</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-owner'>Delete Driver</a></td>"
    );
    return newTr;
  }

  // Function for retrieving drivers and getting them ready to be rendered to the page
  function getOwners() {
    $.get("/api/owners", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createOwnerRow(data[i]));
      }
      $("#numberOfDrivers").html("Drivers (Total - " + data.length + ")");
      renderOwnerList(rowsToAdd);
      nameInput.val("");
      $("#driver-email").val("");
      $("#driver-avail").val("");
    });
  }

  // A function for rendering the list of drivers to the page
  function renderOwnerList(rows) {
    ownerList
      .children()
      .not(":last")
      .remove();
    ownerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      ownerList.prepend(rows);
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.css({
        width: "610px"
      });
      alertDiv.text(
        "All Drivers must be certified, insured, and have passed our extensive screening process!"
      );
      ownerContainer.append(alertDiv);
    }
  }
  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("owner");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/owners/" + id
    }).then(getOwners);
  }
});
