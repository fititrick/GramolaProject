/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
//objeto playList con sus métodos
   function playList(idList, NSongs,FirstSong){
		 //lo creo asi, para que la primera vez, al meter solo una cancion, sea tanto la primera como la ultima.
		 var id=idList;
		 var numberSongs = NSongs;
		
		 var firstSong = FirstSong;
		 var lastSong = FirstSong;
		  //el id del playlist sera el mismo id que tiene la lista en la base de datos.
		
		this.getNumberSongs = function() {
			return numberSongs;
		};
		
		this.getFirstSong = function() {
			return firstSong;
		};
		
		this.getLastSong= function() {
			return lastSong;
		};
		
		this.setNumberSongs = function(pNumber) {
			numberSongs = pNumber;
		};
		this.setId = function(pId) {
			id = pId;
		};
		this.getId = function() {
			return id;
		};
		this.incrNumberSongs =function() {
			numberSongs =numberSongs+ 1;
			//alert(numberSongs);
		};
		
		this.setFirstSong = function(pFirst) {
			 firstSong = pFirst;
		};
		
		this.setLastSong = function(pLast) {
			 lastSong = pLast;
		}
		this.addSong= function(song){
			if(firstSong==null){
				firstSong=song;
				this.setLastSong(song);
			}
			else{
				lastSong.setNextSong(song);
				song.setNextSong(this.getFirstSong());
			}
			song.setIdList(id);
			this.incrNumberSongs();	
		}
		this.delPlayList=function(){
			 	 id=0;
				 numberSongs = 0;
				 firstSong = null;
				 lastSong = null;
		}

	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7	