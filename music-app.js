//music list 
var playList = {
    list: [
        {name:"Drake - Charged Up (CDQ)", src:"./playlist/Drake-ChargedUp.mp3", index:1},
        {name:"Drake - Days In The East", src:"./playlist/Drake-DaysInTheEast.mp3", index:2},
        {name:"Drake - Go Out Tonight", src:"./playlist/Drake-GoOutTonight.mp3", index:3},
        {name:"Drake - The Language", src:"./playlist/Drake-TheLanguage.mp3", index:4},
        {name:"J. Cole - Black Friday", src:"./playlist/J.Cole-BlackFriday.mp3", index:5},
        {name:"J.Cole - Forbidden Fruit - (Musicfire.in)", src:"./playlist/ForbiddenFruit.mp3", index:6},
        {name:"Kendrick Lamar - Black Friday", src:"./playlist/KendrickLamar-BlackFriday.mp3", index:7},
        {name:"Mario - I Choose You", src:"./playlist/ichooseu.mp3", index:8},
        {name:"T.I - Memories Back Then", src:"./playlist/memoriesbackthen.mp3", index:9},
        {name:"My Boo - Usher feat. Alecia Keys", src:"./playlist/MyBoo.mp3", index:10},
        {name:"Omarion - PostToBe", src:"./playlist/PostToBe.mp3", index:11},
        {name:"Pharrel - That Girl [Ft. Snoop Dogg]", src:"./playlist/ThatGirl.mp3", index:12},
        {name:"Ray J - One Wish", src:"./playlist/OneWish.mp3", index:13},
        {name:"Tamia - So Into You", src:"./playlist/sointoyou.mp3", index:14},
        {name:"SZA - Babylon (ft. Kendrick Lamar)", src:"./playlist/Babylon.mp3", index:15},
        {name:"Tyga Ft Chris Richardson - Far Away", src:"./playlist/FarAway.mp3", index:16},
        {name:"Wale Ft. Usher - The Matrimony", src:"./playlist/TheMatrimony.mp3", index:17}    

    ]   
};


//setup and compile handlebars template
var musicSource = document.getElementById('customList').innerHTML;
var musicTemplate = Handlebars.compile(musicSource);

var musicList = document.querySelector('#songs');

musicList.innerHTML = musicTemplate(playList);

var play = document.getElementById('playButton');
var audio = document.getElementById('songs');
var song = document.getElementsByTagName('audio');
var next  = document.getElementById('nextButton');
var prev = document.getElementById('prevButton');
var li = document.getElementsByTagName('li');
var playNow = document.getElementById('playNow');
var listItem = document.querySelector('li');
var counter = 0;
var visualisation = document.querySelector('.visualisation');

window.onload = function() {
play.classList.add('playButton');


var heading = [{title: 'Music App - Streaming Music', heading : "Music App - Live Streaming"}];

var headData = document.querySelector('.heading');
var headingSource = document.getElementById('heading').innerHTML;
var headingTemplate = Handlebars.compile(headingSource);

headData.innerHTML = headingTemplate(heading[0]);
    
}

play.addEventListener('click', function() {
    play.classList.remove('playButton');
    play.classList.add('pauseButton');
    playSong();
    
});

next.addEventListener('click', function() {
    nextSong();
});

prev.addEventListener('click', function() {
   prevSong(); 
});


listItem.addEventListener('click', function() {
    
console.log('clicked');
});
/////////SKIP TRACK////////////////////////
function nextSong() {
   if (localStorage.counter == undefined) {
        localStorage.setItem('counter', counter);
              playSong();
   } else {
       var songIndexes = li.length - 1;
    if (localStorage.counter == songIndexes) {
            counter = songIndexes; 
            localStorage.setItem('counter', counter);
       } else {
        counter = localStorage.counter;
        stopPlayBack();
        counter++;
        localStorage.setItem('counter', counter);
        playSong();
       }
   }
    
}

/////////STOP TRACK////////////////////////
function stopPlayBack() {
  li[localStorage.counter].classList.remove('playing');
    song[localStorage.counter].pause();
    song[localStorage.counter].currentTime = 0;
}

/////////PAUSE TRACK////////////////////////
function pauseSong() {
       li[localStorage.counter].classList.remove('playing');
            play.classList.add('playButton');

       li[localStorage.counter].classList.add('pause');
        play.classList.remove('pauseButton');

      song[localStorage.counter].pause();
}

/////////PLAY TRACK////////////////////////
function playSong() {
    var currentSong = 0;
    

        if (localStorage.counter == undefined) {
        localStorage.setItem('counter', 0);
        currentSong = localStorage.counter;
        song[currentSong].play();
            
        if (li[currentSong].classList.contains('playing')) {
            pauseSong();
        } else {
        li[currentSong].classList.add('playing');

        }
            
    } else {
            
        if (li[localStorage.counter].classList.contains('playing')) {
            pauseSong();
        } else {
        currentSong = localStorage.counter;
        song[currentSong].play();
        li[localStorage.counter].classList.remove('pause');
        li[currentSong].classList.add('playing');
        if (playList.list[currentSong].name.includes('Drake')) {
            visualisation.style.backgroundImage = "url('./images/album_art/Drake.jpg')";
            visualisation.style.backgroundSize = 'cover';
        } else {
              visualisation.style.backgroundImage = "url('./images/album_art/unknown.jpg')";
            visualisation.style.backgroundSize = 'cover';
        }
        }
        
        
    }
    
     var intervals =  setInterval( function() {
       autoSkip();
       
      // console.log('running');
    }, 1000);
}


/////////PREVIOUS TRACK////////////////////////
function prevSong() {
    clearInterval(intervals);
    
    if (localStorage.counter == undefined) {
        localStorage.setItem('counter', counter);
        playSong();
   } else {
       var songIndexes = li.length - 1;
       
    if (localStorage.counter < songIndexes) {
            counter = 0; 
            //console.log('beginning of playlist')
            localStorage.setItem('counter', counter);
       } else {
        counter = localStorage.counter;
        stopPlayBack();
        counter--;
        localStorage.setItem('counter', counter);
       playSong();
       }
   }

       var intervals =  setInterval( function() {
       autoSkip();
       
       //console.log('running');
    }, 1000);
}


/////////AUTOMATIC SKIP////////////////////////
function autoSkip() {
    
    if (song[localStorage.counter].ended === true) {
        nextSong();
    }
}

///////////SEARCH/////////////////////////////
var searchField = document.getElementById('search');

searchField.onkeyup = function(e) {
    var filterResults = {list:[]};
   
    for (var i = 0; i < playList.list.length; i++) {
            if (playList.list[i].name.includes(searchField.value)) {
                filterResults.list.push(
                    {name: playList.list[i].name, src: playList.list[i].src, index: playList.list[i].index}
                );
            }
    }
    

    musicList.innerHTML = musicTemplate(filterResults);    
        play.classList.add('playButton');
    //console.log(filterResults);
}