(function() {
    
    // Get the list of videos (a dic with basic infos)
    function getVideos() {
        // list of the divs from the videos in the playlist
        var div_videos = Object.values( document.querySelectorAll("#content") ).filter( (div_video) => {
            if( ["style-scope","ytd-playlist-video-renderer"]
                    .every( 
                        className => Object.values( div_video.classList ).includes( className )
                    )
            ){ return div_video; }
        });
        
        var videos = [];

        for( let div_video of div_videos ){
            video = {
                "title": div_video.querySelector("#video-title").getAttribute("title"),
                "channel": div_video.querySelectorAll(".yt-simple-endpoint.style-scope.yt-formatted-string")[0].innerHTML,
                "link": "youtube.com/" + div_videos[0].querySelector("#video-title").getAttribute("href")
            };
            videos.push(video);
        }

        return videos;
    }
    
    // Get the list in a string format
    function getVideosStr( displayTitle=true, displayChannel=true, displayLink=true, separator=";") {

        if(!displayTitle && !displayChannel && !displayLink){
            return "";        
        }
        
        var videos = getVideos();

        var videos_str = "";

        for( const video of videos ){
            let line = "";
            if( displayTitle ){
                line += video.title;
            }
            if( displayChannel ){
                if( line.length > 0 ){ line += separator; }
                line += video.channel;
            }
            if( displayLink ){
                if( line.length > 0 ){ line += separator; }
                line += video.link;
            }
            videos_str += line + '\n';
        }
        
        return videos_str;
    }
    
    // handle how to display the a text to the user
    function displayString( str, format="console" ){
        switch(format){
            case 'console':
                console.log( str );
                break;
        }
    }

    // When button clicked
    browser.runtime.onMessage.addListener((message) => {
        if( message.command === "list" ) {
            let videos_str = getVideosStr( message.displayTitle, message.displayChannel, message.displayLink, message.separator );
            displayString( videos_str );
        }
    });

})();
