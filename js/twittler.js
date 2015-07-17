$(document).ready(function() {
    var $tweetContainer = $('#tweetContainer');
    $tweetContainer.html('');
    var globalTimeline = 'tweet'; // switches from 'tweet' to specific usernames to determine which timeline to show
    var switchTimeline = function(username) {
        console.log('switchTimeline username: ' + username)
        if (globalTimeline === username) {
            $('.tweet').fadeIn();
            globalTimeline = 'tweet';
        } else if (globalTimeline !== username) {
            $('.tweet').filter(function() {
                return !($(this).hasClass('' + username));
            }).fadeOut();
            globalTimeline = username;
        }
    };
    var discernTimeline = function() {
        $('.tweet').filter(function() {
            return !($(this).hasClass('' + globalTimeline));
        }).hide();
    };
    // Each tweet is given a unique number
    var globalTweetNumber = 0;
    var showTweets = function(interval) {
        // We're running showTweets again, so let's remove .newTweets from the old newTweets, because they're now old. 
        $('.newTweets').removeClass('newTweets');
        // Let's remove any tweets that are so old they are effectively dead. We identify the old tweets by the globalTweetNumber
        $('.tweet').filter(function() {
            return $(this).data().tweetNumber < (
                globalTweetNumber - 20);
        }).fadeOut(400);
        // There's a whole lot of backlogged tweets we have to get through. They're all in streams.home 
        while (streams.home.length > 0) {
            // take the tweet out of the queue, also lowering the length by 1, so we have our while loop end condition. 
            var tweet = streams.home.shift();
            // create the $tweet div. Personally, I think this is lousy naming convention with tweet and $tweet, but I didn't write this code.  
            var $tweet = $('<div></div>');
            // Lets sort out the data so that we can work with it later.
            //// Every tweet is going to be given the .tweet class. Styling .tweet styles EVERY tweet. Nice. 
            // We can give each tweet a class that is the same as the username. Handy later. 
            // We can also give it the 'newTweets' class, because this tweet is just being born!
            $tweet.addClass('tweet');
            $tweet.addClass(tweet.user);
            $tweet.addClass('newTweets');
            // Let's also give it some data so that we can figure out which tweets are whose, and a way to identify which tweets came out first.  
            $tweet.data('user', tweet.user);
            $tweet.data('tweetNumber', globalTweetNumber);
            var uniqueID = "TW" + globalTweetNumber;
            // generate the inner html of the $tweet div. Every username link will have the class "userlink" so that we can identify it later AS a userlink and style it. 
            $tweet.html('#' + globalTweetNumber + '   @' +
                '<a class="userlink" id="' + uniqueID +
                '" href="#">' + tweet.user + '</a>: <div class="message">' + tweet.message +
                '</div><div class="timeStamp">' + tweet.created_at +
                '</div>');
            // and fade those suckers in. 
            $tweet.fadeIn().prependTo($tweetContainer);
            // Now that we have marked the globalTweetNumber, let's increment it for the next tweet.
            globalTweetNumber++;
        } // END WHILE
        // Since we're looping this, let's unbind the events from earlier, otherwise we'd have multiple events on the the same thing.  
        $('.tweet').find('.userlink').unbind('click');
        // Let's add unique event listeners for each item. 
        $('.tweet').find('.userlink').on('click', function(event) {
            console.log($(this).attr('id') + " " +
                "clicked on.");
            console.log($(this).parent().data().user);
            // This will fadeout all elements that don't conform & set the timeline to the user -- or if the timeline is on the user, set it back to all tweets.
            switchTimeline($(this).parent().data().user);
        });
        // This hides any newly generated tweets that do not have a class that is stored in the globalTimeline variable. 
        discernTimeline();
    };
    showTweets();
    setInterval(showTweets, 10000);
});
// END PROGRAM