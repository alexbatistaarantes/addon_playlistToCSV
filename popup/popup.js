
function listenForClicks() {
    
    document.addEventListener( "click", (e) => {
        
        function call_listPlaylist( tabs ){
            browser.tabs.sendMessage( tabs[0].id, 
                {
                    command: "list",
                    displayTitle: true,
                    displayChannel: true,
                    displayLink: true,
                    separator: ';'
                }
            );
        }
        
        function reportError( error ){
            console.error(`An error occurred: ${error.messsage}`)
        }

        if( e.target.id == "execute-listPlaylist" ){
            browser.tabs.query( {active:true, currentWindow:true} )
                .then( call_listPlaylist )
                .catch( reportError );
        }
    });
}

function reportExecuteScriptError( error ){
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`An error occurred: ${error.message}`);
}

browser.tabs.executeScript( {file:"/content_scripts/playlist.js"} )
    .then( listenForClicks )
    .catch( reportExecuteScriptError );

