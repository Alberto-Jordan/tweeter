// Scroll to top of the screen and focus on the text area
const scrollToTop = () => {
  $(document).scrollTop(0);
  $("#tweet-text").focus();
};

// Show or hide scroll button and new tweet toggle based on scroll position
const handleScroll = () => {
  const isScrolled = $(document).scrollTop() !== 0;
  $(".toggle-scroll").toggleClass("hidden", !isScrolled);
  $(".toggles").toggleClass("hidden", isScrolled);
};

$(document).ready(() => {
  $(document).on("scroll", handleScroll);
  $(".toggle-scroll").on("click", scrollToTop);
});
