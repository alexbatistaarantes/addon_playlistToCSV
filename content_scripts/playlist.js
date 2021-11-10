(function() {

    // scroll to bottom
    //window.scroll(0, document.getElementsByTagName("ytd-browse")[0].scrollHeight)

    function listPlaylist() {

        // list of the divs from the videos in the playlist
        var div_videos = Object.values( document.querySelectorAll("#content") ).filter( (div_video) => {
            if(
                ["style-scope","ytd-playlist-video-renderer"].every( className => Object.values( div_video.classList ).includes( className ))
            ){ return div_video; }
        });

        var videos = "";

        for( const div_video of div_videos ){
            let title = div_video.querySelector("#video-title").getAttribute("title");
            let channelName = div_video.querySelectorAll(".yt-simple-endpoint.style-scope.yt-formatted-string")[0].innerHTML;
            videos += title + ';' + channelName + '\n';
        }

        console.log(videos);
    }
    
    // When button clicked
    browser.runtime.onMessage.addListener((message) => {
        if( message.command === "list" ) {
            listPlaylist();
        }
    });

})();
