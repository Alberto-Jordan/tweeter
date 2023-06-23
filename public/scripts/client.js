// Renders tweets on the webpage
const renderTweets = function(tweets) {
  // Clear the tweets container
  const tweetContainer = $("#tweets");
  tweetContainer.empty();

  // Add each tweet to the container
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets').prepend(tweetElement);
  }
};

// Generates HTML for a single tweet
const createTweetElement = (tweetData) => {
  // Create the HTML structure for the tweet
  const $tweet = $(`
    <div class="tweet-container">
      <!-- Header -->
      <header>
        <div class="icon-name">
          <img src="${tweetData.user.avatars}" alt="avatar">
          <p>${tweetData.user.name}</p>
        </div>
        <div class="username">${tweetData.user.handle}</div>
      </header>

      <!-- Tweet content -->
      <p class="tweets-text">${tweetData.content.text}</p>

      <!-- Footer -->
      <footer>
        <p>${timeago.format(tweetData.created_at)}</p>
        <div class="social-tags">
          <i class="fa-solid fa-flag report"></i>
          <i class="fa-solid fa-retweet retweet"></i>
          <i class="fa-solid fa-heart like"></i>
        </div>
      </footer>
    </div>
  `);

  return $tweet;
};

// Fetches tweets from the server and renders them on the page
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    success: function(data) {
      renderTweets(data);
    },
    error: function(err) {
      console.log(`Error: ${err.status} ${err.statusText}`);
    },
    dataType: "json",
  });
};

$(document).ready(() => {
  // Handle tweet submission
  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $(".error").slideUp(400, function() {
      const tweetLength = $("#tweet-text")[0].value.length;
      $(this).empty();

      // Validate the tweet length
      if (tweetLength === 0) {
        $(this).append("⚠️ Your tweet must contain text! ⚠️").slideDown();
        return;
      }
      if (tweetLength > 140) {
        $(this).append("⚠️ Your tweet is too long. Please make it 140 characters or less! ⚠️").slideDown();
        return;
      }

      // Submit the tweet to the server
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: function() {
          $("#tweet-text").val("");
          $(".counter").text("140");
          loadTweets();
        },
        error: function(err) {
          console.log(`Error: ${err.status} ${err.statusText}`);
        },
      });
    });
  });

  // Load tweets when the page is ready
  loadTweets();
});
