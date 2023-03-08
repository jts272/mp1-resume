function sendMail(contactForm) {
  // args: serviceID, templateID, parameters object
  emailjs
    .send("service-outlook", "template-mp1-resume", {
      // Get the HTML form's input values to populate the send parameters:
      // NOTE: keys are set in the EmailJS template from the web.
      from_name: contactForm.fullname.value,
      from_email: contactForm.emailaddress.value,
      project_request: contactForm.projectsummary.value,
    })
    .then(
      function (response) {
        console.log("Success", ": ", response);
      },
      function (error) {
        console.log("Error", ": ", error);
      }
    );
  // Prevent page refresh on form submit!
  return false;
}
