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
}
