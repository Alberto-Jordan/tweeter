
const renderTweets = function(tweets) {
  const oldTweetContainer = $("#old-tweets");
  oldTweetContainer.empty();

  for (const tweet of tweets) {
    const tweetValue = createTweetElement(tweet);
    $('#old-tweets').prepend(tweetValue);
  }
};


const createTweetElement = (tweetData) => {
  const $tweet = $(`
    <article>
      <header>
        <div class="icon-name">
          <img src="${tweetData.user.avatars}" alt="avatar">
          <p>${tweetData.user.name}</p>
        </div>
        <div class="username">${tweetData.user.handle}</div>
      </header>
      <p class="old-tweet-text">${tweetData.content.text}</p>
      <footer>
        <p>${timeago.format(tweetData.created_at)}</p>
        <div class="social-tags">
          <i class="fa-solid fa-flag report"></i>
          <i class="fa-solid fa-retweet retweet"></i>
          <i class="fa-solid fa-heart like"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

// Make a GET request to the database and render the tweets on a successful request
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    success: function(data) {
      renderTweets(data);
    },
    error: function(err) {
      console.log(`${err.status} ${err.statusText}`);
    },
    dataType: "json",
  });
};

$(document).ready(() => {
  // Handle form submission
  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $(".error").slideUp(400, function() {
      const tweetLength = $("#tweet-text")[0].value.length;
      $(this).empty();
      if (tweetLength === 0) {
        $(this).append("⚠️ Your tweet must contain text! ⚠️").slideDown();
        return;
      }
      if (tweetLength > 140) {
        $(this).append("⚠️ Your tweet is too long. Please make it 140 characters or less! ⚠️").slideDown();
        return;
      }
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
          console.log(`${err.status} ${err.statusText}`);
        },
      });
    });
  });

  // Load tweets on page load
  loadTweets();
});
