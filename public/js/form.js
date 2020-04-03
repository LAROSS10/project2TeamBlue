$(document).ready(function() {
  //pointer variables
  //=====================================
  //const $issueNumber = $("#issue-number");
  //will be autogenerated now

  //const $requesterName = $("#requester-name");
  //pulled from who is logged in

  const $clientName = $("#client-name");
  const $financialImpact = $("#financial-impact");
  //const $escalationAnalyst = $("#escalation-analyst");
  //be assigned by app I think

  //Submit button used to submit the info to the app/database
  //The userId starts out null but is quickly assigned to the person logged in
  const $submitButton = $("#submit");
  let userId = null;
  //const $requestDate = $("#request-date");
  //will be sent when the submit button is hit

  //const $resolvedDate = $("#resolved-date");
  //probably going to be null when hit because it is an issue waiting to be resolved when submitted.

  //initial setting of which user is currently logged in so we know who to assign the issue to
  $.get("api/user_data").then(function(data) {
    userId = data.id;
  });
  //event listeners
  //=====================================
  $submitButton.on("click", function(event) {
    event.preventDefault();
    //load in the user data
    const newCase = {
      id: userId,
      clintName: $clientName.val().trim(),
      financialImpact: $financialImpact.val().trim()
    };

    //call our function to post the issue to the database
    submitIssue(newCase);
  });

  //functions
  //=====================================
  //our main function for posting issues
  function submitIssue(newCase) {
    $.post("api/case", newCase).then(function() {
      console.log("issue posted: ", newCase);
    });
  }
});
