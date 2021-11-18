
function listenForClicks() {
    
    document.addEventListener( "click", (e) => {
        
        let displayTitle = document.querySelector("input[name=title]").checked;
        let displayChannel = document.querySelector("input[name=channel]").checked;
        let displayLink = document.querySelector("input[name=link]").checked;
        let separator = document.querySelector("input[name=separator]").value;

        function listToClipboard( tabs ){
            browser.tabs.sendMessage( tabs[0].id, 
                {
                    command: "listToClipboard",
                    displayTitle: displayTitle,
                    displayChannel: displayChannel,
                    displayLink: displayLink,
                    separator: separator
                }
            );
        }
        function listToFile( tabs ){
            browser.tabs.sendMessage( tabs[0].id, 
                {
                    command: "listToFile",
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

        if( e.target.id == "button_toClipboard" ){
            browser.tabs.query( {active:true, currentWindow:true} )
                .then( listToClipboard )
                .catch( reportError );
        }
        if( e.target.id == "button_toFile" ){
            browser.tabs.query( {active:true, currentWindow:true} )
                .then( listToFile )
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

