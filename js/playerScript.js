/*-------------------------------------------------------------------------
* Gramola's player framework with classes and methods to ensure a proper
* playback of any playlist on the program.
*
* DEPENDENCIES
*  - //ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
* - ./js/swfobjects.js
*
*-------------------------------------------------------------------------*/

// Global Variables
var PROVIDER = {
	YOUTUBE : 0,
	GOEAR : 1, 
	MP3: 2
}

// Variables needed in the workflow of the YTAPI
var player, apiReady = false;

// Variables needed in the workflow of the mp3Player
var audioFile;

// Variables for the player to use
var playlist, repeat = false, actualPosition, lastProvider = -1;
//metodo que busque una url y te devuelva la posicion
//asignaria actualPosition a la cancion que has pulsado, y llamar a playSong(song)
function next(song) {
    actualPosition = song;
    playSong(song);
}

// Variables for YouTube API to use
var youTubePlayerStarted = false, mp3PlayerStarted = false;

// Object definition
/**
 * Class: Song
 *
 * @param String id Unique identifier of a playlist.
 * @param int nSongs Number of the song?.
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
 * @param int nSongs Number of the song?.
 */
function Playlist(id) {
	//lo creo asi, para que la primera vez, al meter solo una cancion, sea tanto la primera como la ultima.
	this.id = id;
	this.numberSongs = 0;
	this.firstSong = null;
	this.lastSong = null;

	//el id del playlist sera el mismo id que tiene la lista en la base de datos.
	this.getNumberSongs = function() {
		return this.numberSongs;
	};

	this.getFirstSong = function() {
		return this.firstSong;
	};

	this.getLastSong = function() {
		return this.lastSong;
	};

	this.setId = function(newId) {
		this.id = newId;
	};

	this.getId = function() {
		return this.id;
	};

	this.incrNumberSongs = function() {
		this.numberSongs = this.numberSongs + 1;
		//alert(numberSongs);
	};

	this.setFirstSong = function(pFirst) {
		this.firstSong = pFirst;
	};

	this.setLastSong = function(pLast) {
		this.lastSong = pLast;
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
	this.delPlayList = function() {
		this.id = 0;
		this.numberSongs = 0;
		this.firstSong = null;
		this.lastSong = null;
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
}

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	apiReady = true;
	$('#play').attr("disabled", false);
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

	$('.html5Player').append("<audio controls autoplay id='mp3Player'><source src=" + audioURI + "></audio>");
	document.getElementById("mp3Player").addEventListener("ended", next);

}

function destroyAudio() {

	$('#mp3Player')[0].remove();

}

function createGoear(goearId) {
	$.ajax({
		type : 'GET',
		url : 'php/goearScript.php',
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
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		next();
	}
}

function next() {

	// If it is not empty
	if (playlist.getNumberSongs() > 0) {

		// If the playlist hasn't started yet
		if (actualPosition == null) {
			// Retrieve the first element and play
			actualPosition = playlist.getFirstSong();
			playSong(actualPosition);
			return true;
		}
		// If the playlist is not over
		else if (actualPosition.getNextSong() != null) {
			// Retrieve the next song and play it
			actualPosition = actualPosition.getNextSong();
			playSong(actualPosition);
			return true;
		}
		// In case it is over, check if we should start again
		else if (repeat) {
			// 3.1 Go back at the beginning
			actualPosition = playlist.getFirstSong();
			playSong(actualPosition);
			return true;
		}
		// 3.3 The playlist is over
		else {
			// 3.3 Set the playlist as not started and leave
			actualPosition = null;
			return false;
		}
	}
	return false;
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
		default:

	}

}

function stopVideo() {
	player.stopVideo();
}

function playVideo() {
	player.playVideo();
}

function startPlayer() {
//	printPlaylist();
	next();
}

function printPlaylist(){
	var auxSong = playlist.getFirstSong();
	$('#order').children().remove();
	
	for (var j = 0; j < playlist.getNumberSongs(); j++){
		$('#order').append($('<li>', {
         	text: auxSong.getId()
		}));
		auxSong = auxSong.getNextSong();

	}	
}

$('#play').click(startPlayer);
