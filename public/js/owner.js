$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#owner-name");
  var ownerList = $("tbody");
  var ownerContainer = $(".owner-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#owner-form", handleOwnerFormSubmit);
  $(document).on("click", ".delete-owner", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getOwners();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleOwnerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertOwner({
      name: nameInput.val().trim()
    });
  }

  // A function for creating an owner. Calls getOwners upon completion
  function upsertOwner(ownerData) {
    $.post("/api/owners", ownerData).then(getOwners);
  }

  // Function for creating a new list row for owners
  function createOwnerRow(ownerData) {
    var newTr = $("<tr>");
    newTr.data("owner", ownerData);
    newTr.append("<td>" + ownerData.name + "</td>");
    if (ownerData.Pets) {
      newTr.append("<td> " + ownerData.Pets.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/blog?owner_id=" + ownerData.id + "'>Go to List</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?owner_id=" +
        ownerData.id +
        "'>Create a new Pet</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-owner'>Delete Owner</a></td>"
    );
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getOwners() {
    $.get("/api/owners", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createOwnerRow(data[i]));
      }
      renderOwnerList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderOwnerList(rows) {
    ownerList
      .children()
      .not(":last")
      .remove();
    ownerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      ownerList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.css({
      width: "300px"
    });
    alertDiv.text("Please create a new dog owner...");
    ownerContainer.append(alertDiv);
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
