$(document).ready(function() {
  // Event handler for input event on the textarea
  $('section.new-tweet textarea').on('input', function() {
    console.log("Input event triggered.");
    let textLength = $(this).val().length;
    let counter = $(this).next().find('.counter');
    let remaining = 140 - textLength;

    // Update the character counter
    counter.text(remaining);

    // Update counter color based on text length
    if (textLength > 140) {
      counter.addClass('exceeded');
    } else {
      counter.removeClass('exceeded');
    }

    // Change counter color to red if characters go into negative
    if (remaining < 0) {
      counter.addClass('negative');
      counter.css('color', '#FF0000');
    } else {
      counter.removeClass('negative');
      counter.css('color', '');
    }
  }).trigger('input'); // Trigger the input event on page load to initialize the counter color
});
