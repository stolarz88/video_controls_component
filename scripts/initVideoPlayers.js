var initVideoPlayers = function(elementToSearch){
	/*
	--------------------------------------------------------------------------
	------------------------- Play/Pause functions ---------------------------
	--------------------------------------------------------------------------
	--------------------------------------------------------------------------
	*/
	var controls = {

		// HTML5 + VIMEO Controller
		playPause: function(video, control){
			if(control == 'play'){
				video.play();
			}
			if(control == 'pause'){
				video.pause();
			}
		},

		// youTube Controller
		youTubePlayPause: function(video){
			if (video.getPlayerState() == YT.PlayerState.PLAYING) {
		        video.pauseVideo();
		        // If you want to toggle it and show an image or something
		        //document.getElementById("player").style.opacity = "0";
		    } else {
		        video.playVideo();
		        // If you want to toggle it and show an image or something
		        //document.getElementById("player").style.opacity = "1";
		    }
		}
	};
	/*
	--------------------------------------------------------------------------
	---------------------------- HTML5 ---------------------------------------
	--------------------------------------------------------------------------
	--------------------------------------------------------------------------
	*/
	var html5 = {
		autoPlay: function(video){
			controls.playPause(video, 'play');
		},
		manualControls: function(video, playButton, pauseButton){
			if(playButton){
				playButton.addEventListener("click", function(){
					controls.playPause(video, 'play');
				});
			};
			if(pauseButton){
				pauseButton.addEventListener("click", function(){
					controls.playPause(video, 'pause');
				});
			};
		},
		init: function(playButton, pauseButton){
			var html5video = elementToSearch.getElementsByTagName("video")[0];
			if (html5video) {
				// ***** ENABLE HTML5 AUTOPLAY ****** //
				// html5.autoPlay(html5video);
				// ***** ENABLE HTML5 AUTOPLAY ****** //
				
				// Set up button controls :: Don't forget the markup
				html5.manualControls(html5video, playButton, pauseButton);
			};
		}
	};
	/*
	--------------------------------------------------------------------------
	---------------------------- VIMEO ---------------------------------------
	--------------------------------------------------------------------------
	--------------------------------------------------------------------------
	*/
	var vimeo = {
		loadVmAPI: function(){
			var jsFile = 'scripts/vimeo-player.js';
			var script = elementToSearch.createElement("script");
			script.type = "text/javascript";
			script.src = jsFile;
			var htmlElement = elementToSearch.getElementsByTagName('body')[0];
			htmlElement.appendChild(script);
		},
		manualControls: function(video, playButton, pauseButton){
			if(playButton){
				playButton.addEventListener("click", function(){
					// Looks redundant but it needs this
					var vimeo = new Vimeo.Player(video);
					controls.playPause(vimeo, 'play');
				});
			};
			if(pauseButton){
				pauseButton.addEventListener("click", function(){
					// Looks redundant but it needs this
					var vimeo = new Vimeo.Player(video);
					controls.playPause(vimeo, 'pause');
				});
			}
		},
		init: function(playButton, pauseButton){
			var vimeoContainer = elementToSearch.querySelector('#vimeo iframe');
			if (vimeoContainer) {
				// Loads third party script from /scripts folder to be included on page
				vimeo.loadVmAPI();
				// AUTO PLAY //
				//add ?autoplay=1 after VimeoID parameter to end of Vimeo embed to do an autoplay
				// ********* //
				vimeo.manualControls(vimeoContainer, playButton, pauseButton);
			};
		}
	};

	/*
	--------------------------------------------------------------------------
	---------------------------- YOUTUBE ---------------------------------------
	--------------------------------------------------------------------------
	--------------------------------------------------------------------------
	*/
	var youtubeFunc = {
		loadYtAPI: function(playButton, pauseButton){
		    var tag = elementToSearch.createElement('script');
			tag.src = "//www.youtube.com/player_api";
			var firstScriptTag = elementToSearch.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubePlayerAPIReady = function() {
			    var player = new YT.Player('player');
			    youtubeFunc.manualControls(player, playButton, pauseButton)
			}
		},
		

		manualControls: function(video, playButton, pauseButton){
			if(playButton){
				playButton.addEventListener("click", function(){
					controls.youTubePlayPause(video);
				});
			}
			if(pauseButton){
				pauseButton.addEventListener("click", function(){
					controls.youTubePlayPause(video);
				});
			}
		},
		init: function(playButton, pauseButton){
			var youtubeContainer = elementToSearch.querySelector('#youtube iframe');
			if (youtubeContainer) {
				// Loads third party script from youtube CDN to be included on page
				youtubeFunc.loadYtAPI(playButton, pauseButton);
				// AUTO PLAY //
				// add ?rel=0&autoplay=1 after YoutubeID parameter to end of Youtube embed to do an autoplay
				// ********* //
			}
		}
	};

	var html5Init = function(playButton, pauseButton){
		html5.init(playButton, pauseButton);
	};
	var vimeoInit = function(playButton, pauseButton){
		vimeo.init(playButton, pauseButton);
	};
	var youTubeInit = function(playButton, pauseButton){
		youtubeFunc.init(playButton, pauseButton);
	};

	return {
		html5Init:html5Init,
		vimeoInit:vimeoInit,
		youTubeInit:youTubeInit
	}
	
};
