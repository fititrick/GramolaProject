/*-------------------------------------------------------------------------
* Gramola's player framework with classes and methods to ensure a proper
* playback of any playlist on the program.
*
* DEPENDENCIES
*  - //ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
*  - /js/swfobjects.js
*
* VERSION
*  - v0.1.201307231550
*
*-------------------------------------------------------------------------*/

// Global Variables
var PROVIDER = {
	YOUTUBE : 0,
	GOEAR : 1,
	MP3 : 2
}

// Variables needed in the workflow of the YTAPI
var player, apiReady = false;

// Variables needed in the workflow of the mp3Player
var audioFile;

// Variables for the player to use
var playlist, lastProvider = -1;

// Variables for YouTube API to use
var youTubePlayerStarted = false;

// Object definition
/**
 * Class: Song
 *
 * @param String id Unique identifier of a song
 * @param int Provider Provider of the song
 */
function Song(id, provider) {
	this._id = id;
	this._provider = provider;
	this._nextSong = null;

	// Getters
	this.getId = function() {
		return this._id;
	};

	this.getNextSong = function() {
		return this._nextSong;
	};

	this.getProvider = function() {
		return this._provider;
	}
	// Setters
	this.setNextSong = function(nextSong) {
		this._nextSong = nextSong;
		return true;
	};
	this.setProvider = function(provider) {
		this._provider = provider;
	}
}

/**
 * Class: Playlist
 *
 * @param String id Unique identifier of a playlist.
 */
function Playlist(id) {
	this.id = id;
	this.actualPosition = null;
	this.firstSong = null;
	this.lastSong = null;
	this.numberSongs = 0;
	this.repeat = false;
	this.searchIdSong=function (id){
		var sAux;
		for(var i=0;i<this.numberSongs;i++){
			if(i==0){
				sAux=this.getFirstSong();
			}
			else{
				if(sAux.getId()==id){
					return sAux;
				}
				sAux=sAux.getNextSong();
			}
		}
		return null;
	}
	this.getActualPosition = function() {
		return this.actualPosition;
	}

	this.getElement = function(n) {
		var sAux = null;

		if (n <= this.numberSongs) {
			sAux = this.getFirstSong();

			for (var i = 0; i < n; i++) {
				sAux = sAux.getNextSong();
			}
		}
		//devolvera null si n es mayor que el numero de elementos que hay
		return sAux;
	}

	this.getFirstSong = function() {
		return this.firstSong;
	};

	this.getId = function() {
		return this.id;
	};

	this.getNumberSongs = function() {
		return this.numberSongs;
	};

	this.getLastSong = function() {
		return this.lastSong;
	};

	this.getRepeat = function() {
		return this.repeat;
	}

	this.setActualPosition = function(actualPosition) {
		this.actualPosition = actualPosition;
	}

	this.setFirstSong = function(pFirst) {
		this.firstSong = pFirst;
	};

	this.setId = function(newId) {
		this.id = newId;
	};

	this.setLastSong = function(pLast) {
		this.lastSong = pLast;
	}

	this.setRepeat = function(repeat) {
		this.repeat = repeat;
	}

	this.addSong = function(song) {
		if (this.firstSong == null) {
			song.setNextSong(null);
			this.firstSong = song;
			this.setLastSong(song);

		} else {
			song.setNextSong(null);
			this.lastSong.setNextSong(song);
			this.setLastSong(song);
		}
		this.incrNumberSongs();
	}

	this.delElement = function(n) {
		var sAux = null;

		if (n <= this.numberSongs) {
			sAux = this.getFirstSong();
			if (n == 0) {
				this.setFirstSong(sAux.getNextSong());

			} else {
				for (var i = 1; i < n; i++) {
					sAux = sAux.getNextSong();
				}
				sAux.setNextSong(sAux.getNextSong().getNextSong());
			}
			this.numberSongs--;
			return true;
		}
		//devolvera null si n es mayor que el numero de elementos que hay
		return false;
	}

	this.addElementPos = function(n, song) {
		var sAux = null;
		if (n <= this.numberSongs) {
			sAux = this.getFirstSong();
			if (n == 0) {
				song.setNextSong(sAux);
				this.setFirstSong(song);

			} else {
				for (var i = 1; i < n; i++) {
					sAux = sAux.getNextSong();
				}
				song.setNextSong(sAux.getNextSong());
				sAux.setNextSong(song);
			}
			this.numberSongs++;
			return true;
		}
		//devolvera null si n es mayor que el numero de elementos que hay
		return false;
	}

/*	this.delPlaylist = function() {
		this.id = 0;
		this.numberSongs = 0;
		this.firstSong = null;
		this.lastSong = null;
	}*/

	this.incrNumberSongs = function() {
		this.numberSongs = this.numberSongs + 1;
		//alert(numberSongs);
	};
}

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var playButton, stopButton, nextSongButton;

// Create playback buttons
playButton = $('<button/>', {
	text : 'Start Playlist',
	id : 'b_startPlayer',
	class : 'button',
	click : startPlayer
});
stopButton = $('<button/>', {
	text : 'Stop',
	id : 'b_stopPlayer',
	class : 'button',
	click : stopPlayer,
	disabled : true
});
nextSongButton = $('<button/>', {
	text : 'Next Song',
	id : 'b_nextSong',
	class : 'button',
	click : next,
	disabled : true
});

function onYouTubeIframeAPIReady() {
	apiReady = true;
	playButton.attr('disabled', false);
}

/* Functions...*/
function createVideo(videoId) {
	if (apiReady) {
		player = new YT.Player('youTubePlayer', {
			height : '390',
			width : '640',
			videoId : videoId,
			playerVars : {
				'rel' : '0',
				'iv_load_policy' : '3',
				'showinfo' : '0',
				'frameborder' : '0'
			},
			events : {
				'onReady' : onPlayerReady,
				'onStateChange' : onPlayerStateChange,
				'onError' : next
			}
		});
	}
}

function deleteVideo() {
	if (player) {
		player = null;
	}
}

function createAudio(audioURI) {

	if ($('#mp3Player')[0]) {
		destroyAudio();
	}
	
	$('.contentDiv:visible .player').prepend("<audio controls autoplay id='mp3Player'><source src=" + audioURI + "></audio>");
	
	document.getElementById("mp3Player").addEventListener("ended", next);

}

function destroyAudio() {

	if($('#mp3Player')[0] != null)
		$('#mp3Player')[0].remove();

}

function createGoear(goearId) {
	$.ajax({
		type : 'GET',
		url : 'goearScript.php',
		dataType : 'json',
		data : {
			'id' : goearId
		},
		success : function(response) {
			createAudio(response.path);
		},
		failure : function(response) {
			next();
		},
		error : function(response) {
			next();
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		next();
	}
}

function next() {
	var auxSong;

	if (playlist == null) {
		throw {
			name : "Player undefined",
			level : "Show Stopper",
			message : "Error detected. The player has not been specified.",
		}
		return false;
	}
	// If it is not empty
	if (playlist.getNumberSongs() > 0) {
		auxSong = playlist.getActualPosition();
		// If the playlist hasn't started yet
		if (auxSong == null) {
			auxSong = playlist.getFirstSong();
			
			// Retrieve the first element and play
			playlist.setActualPosition(auxSong);
			playSong(auxSong);
			return true;
		}
		// If the playlist is not over
		else if (auxSong.getNextSong() != null) {
			auxSong = auxSong.getNextSong();
			// Retrieve the next song and play it
			playlist.setActualPosition(auxSong);
			playSong(auxSong);
			return true;
		}
		// In case it is over, check if we should start again
		else if (playlist.getRepeat()) {
			auxSong = playlist.getFirstSong();
			// Retrieve the first element and play
			playlist.setActualPosition(auxSong);
			playSong(auxSong);
			return true;
		}
		// 3.3 The playlist is over
		else {
			// 3.3 Set the playlist as not started and leave
			playlist.setActualPosition(null);
			return false;
		}
	}
	return false;
}

function playOnClick(song) {
	//TODO: Check if the song is in the playlist
	playlist.setActualPosition(song);
	playSong(song);
}

function playSong(song) {
	var hiddenElements = false;

	// 1. If any player has been played previously and the provider is different
	if (lastProvider > -1 && song.getProvider() != lastProvider) {
		switch (lastProvider) {
			case PROVIDER.YOUTUBE:
				player.stopVideo();
				$('#youTubePlayer').hide();
				break;
			case PROVIDER.GOEAR:
				destroyAudio()
				break;
			case PROVIDER.MP3:
				destroyAudio()
				break;
			default:
		}

		hiddenElements = true;
	}
	// 2. After the fist song we check if we are using the same provider
	switch (song.getProvider()) {
		// 2.2 In case the provider is YouTube
		case PROVIDER.YOUTUBE:
			lastProvider = PROVIDER.YOUTUBE;
			// 2.2.1 If there is no player
			if (!youTubePlayerStarted) {
				// 2.2.1.1 We create one
				createVideo(song.getId());
				youTubePlayerStarted = true;
			}
			// 2.2.2 In case there is
			else {
				// 2.2.2.1 We load the video
				player.loadVideoById(song.getId(), 0);
			}
			// 2.2.3 In case it is hidden
			if (hiddenElements) {
				// 2.2.3.1 Show the YouTube player
				$('#youTubePlayer').show();
			}
			break;
		// 2.3 In case the provider is GOEAR
		case PROVIDER.GOEAR:
			lastProvider = PROVIDER.GOEAR;

			// 2.3.2 Create the audio file
			createGoear(song.getId());

			break;
		// 2.3 In case of standard mp3 audio file
		case PROVIDER.MP3:
			lastProvider = PROVIDER.MP3;

			// 2.3.2 Create the audio file
			createAudio(song.getId());

			break;
		default:
			alert("Default");

	}

}

function startPlayer() {
	stopPlayer();
	$('#b_stopPlayer').attr('disabled', false);
	$('#b_nextSong').attr('disabled', false);
	next();
}
function stopPlayer() {
	$('#b_stopPlayer').attr('disabled', true);
	$('#b_nextSong').attr('disabled', true);
	// 1. If any player has been played previously and the provider is different
	if (lastProvider > -1) {
		switch (lastProvider) {
			case PROVIDER.YOUTUBE:
				player.stopVideo();
				break;
			case PROVIDER.GOEAR:
				destroyAudio()
				break;
			case PROVIDER.MP3:
				destroyAudio()
				break;
			default:
		}

		hiddenElements = true;
	}
	playlist.setActualPosition(null);
}

function printPlaylist() {
	var auxSong = playlist.getFirstSong();
	$('#order').children().remove();

	for (var j = 0; j < playlist.getNumberSongs(); j++) {
		$('#order').append($('<li>', {
			text : auxSong.getId()
		}));
		auxSong = auxSong.getNextSong();

	}
}
