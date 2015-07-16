     $(document).ready(function() {
         var $body = $('body');
         $body.html('');
         var globalTweetNumber = 0;
         var showTweets = function(interval) {
             $('.newTweets').removeClass('newTweets');
             $('.tweet').filter(function() {
                 return $(this).data().tweetNumber < (
                     globalTweetNumber - 20);
             }).fadeOut(400);

             while (streams.home.length > 0) {
                 var tweet = streams.home.shift();
                 var $tweet = $('<div></div>');
                 $tweet.html('@' + '<a href="#">' + tweet.user +
                     '</a>: ' + tweet.message +
                     '<span class="timeStamp"> time: ' + tweet.created_at +
                     '</span>');
                 $tweet.fadeIn().prependTo($body);
                 $tweet.addClass('tweet');
                 $tweet.addClass(tweet.user);
                 $tweet.addClass('newTweets');
                 var timestamp = Date.now();
                 $tweet.data('user', tweet.user);
                 $tweet.data('timestamp', timestamp);
                 $tweet.data('tweetNumber', globalTweetNumber);
                 globalTweetNumber++;
                 console.log($tweet.data().timestamp + " " + $tweet
                     .data().user);
             }


             $('.tweet').on('click', function() {
                 $('.tweet').filter(function() {
                     return ($(this).data().user ===
                         'mracus');
                 }).fadeOut(400)     });
         };
         setInterval(showTweets, 1500);
     });