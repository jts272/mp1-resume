// Function to call when promise resolves:
function userInformationHTML(user) {
  // console.log(user);
  return `
  <h2>${user.name}
    <span class="small-name">
      (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
    </span>
  </h2>
  <div class="gh-content">
    <div class="gh-avatar">
      <a href="${user.html_url}" target="_blank">
        <img 
          src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
      </a>
    </div>
    <p>Followers: ${user.followers} - Following: ${user.following} <br>
    Repos: ${user.public_repos}</p>
  </div>
  `;
}

function repoInformationHTML(repos) {
  // This object is returned as an array, therefore array methods can be used:

  // If empty array:
  if (repos.length == 0) {
    return `<div class="clearfix repo-list">No repos found!</div>`;
  }

  // As data is returned in an array, we want to iterate through it to get the
  // information out (remember .map() works similarly to .forEach(), the returns
  // an array):

  const listItemsHTML = repos.map(function (repo) {
    return `
    <li>
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    </li>`;
  });

  // console.log("listItems: " + listItemsHTML);

  // As the listItemsHTML returns an array from .map(), we can join each
  // iteration with a newline char:

  // NOTE: Ensure the .join() method is included /inside/ the template literal
  // ${expression}.
  return `
  <div class="clearfix repo-list">
    <p>
      <strong>Repo List:</strong>
    </p>
    <ul>
        ${listItemsHTML.join("\n")}
    </ul>
  </div>`;
}

function fetchGitHubInformation(event) {
  // Fix: clear the corresponding divs when the text box is empty so the last
  // user's data does not linger:
  $("gh-user-data").html("");
  $("gh-repo-data").html("");
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

  // Start of jQuery promise. Calls made with $.when():

  // $.when() arg1: getJSON for user
  // $.when() arg1: getJSON for user's repos

  // $.then() args: onSuccessfulResponse, onErrorResponse

  $.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    // REFACTOR: Two calls require two responses (two args for the $.then()
    // function).

    // NOTE: When making multiple calls from $.when(), the response is packed
    // into arrays, so we must specify the first index of the corresponding
    // response object!

    function (response1, response2) {
      const userData = response1[0];
      // console.log(userData);
      const repoData = response2[0];
      // console.log(repoData);
      $("#gh-user-data").html(userInformationHTML(userData));
      $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function (errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`
        <h2>No info found for user ${username}</h2>
        `);
      } else if (errorResponse.status === 403) {
        // Date object is presented as a UNIX timestamp so is multiplied by 1000
        const resetTime = new Date(
          errorResponse.getResponseHeader("X-Rate-Limit-Reset") * 1000
        );
        $("gh-user-date").html(`
        <h4>Too many requests, please wait until ${resetTime.toLocaleDateString()}</h4>}
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

// Show the octocat user (pre-populated in the text field) when DOM is loaded:
$(document).ready(fetchGitHubInformation);
