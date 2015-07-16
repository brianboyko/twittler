     $(document).ready(function(){
        var $body = $('body'); 
        $body.html('');

          var showTweets = function (interval){
            $('.newTweets').removeClass('newTweets');
            while(streams.home.length > 0){
                  var tweet = streams.home.shift();
                  var $tweet = $('<div></div>');
                  $tweet.html('@' + '<a class=href="#">' + tweet.user + '</a>: ' + tweet.message + '<span class="timestamp"> time: ' + tweet.created_at + '</span>');
                  $tweet.prependTo($body);
                  $tweet.addClass('tweet');
                  $tweet.addClass(tweet.user);
                  $tweet.addClass('newTweets');
            }
          }

          setInterval(showTweets, 1500);
      });
