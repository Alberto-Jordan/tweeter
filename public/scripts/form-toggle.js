// Toggle the form visibility when the "Write a new tweet" button is clicked
$(document).ready(() => {
  $(".form-toggle").on("click", () => {
    
    // Slide toggle 
    $("form").slideToggle(400, "linear", () => {
    
      // Set focus to the tweet textarea after the toggle
      $("#tweet-text").focus(); 
    });
  });
});
