$(document).ready(function() {
  $('section.new-tweet textarea').on('input', function() {
    console.log("Input event triggered.");
    var textLength = $(this).val().length;
    var counter = $(this).siblings('div').find('.counter');

    counter.text(140 - textLength);

    if (textLength > 140) {
      counter.addClass('exceeded');
    } else {
      counter.removeClass('exceeded');
    }
  });
});
