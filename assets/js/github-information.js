function fetchGitHubInformation(event) {
  // Get the input from the username text box
  const username = $("#gh-username").val();
  // If the field is empty:
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a Github username</h2>`);
    return;
  }

  // Show the loader.gif on input:
  $("#gh-user-data").html(`
  <div id="loader">
    <img src="assets/css/loader.gif" alt="Loading..." />
  </div>
  `);

  // Start of jQuery promise:
  // when() arg: getJSON
  // then() args: onSuccessfulResponse, onErrorResponse
  $.when($.getJSON(`https://api.github.com/users/${username}`)).then(
    function (response) {
      const userData = response;
      $("#gh-user-data").html(userInformationHTML(userData));
    },
    function (errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`
        <h2>No info found for user ${username}</h2>
        `);
      } else {
        console.log(errorResponse);
        $("gh-user-data").html(`
        <h2>Error: ${errorResponse.responseJSON.message}</h2>
        `);
      }
    }
  );
}
