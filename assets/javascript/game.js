var game = {
    alphabet: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', ' '],
    wordsList: [
        "maluma", 
        "kanye",
        "drake", 
        "carnage", 
        "deorro", 
        "rihanna",
        "khalid"],
    mediaArr: [
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/hM5lO2PWnGk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/oZekbYLRFSQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>', 
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/xpVfcZ0ZcFM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/dermyeoLDgs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/9cBtJYI6itg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/kOkQ4T5WO9E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="320" height="240" src="https://www.youtube-nocookie.com/embed/by3yRdlQvzs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'],

    randomWord: " ",
    correctGuess:[],
    wrongGuess: [],
    splitArr: [],
    countWins: 0,
    countLoss: 0,
    rightGuess: 0,
    countUnder: 0,
    guessLeft: 10,
    
    
//---Methods---//

    //---Start---/
        startGame: function(){

            this.randomWord = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
            console.log(this.randomWord);

        //---Initial Values Reset---//


            this.rightGuess = 0;
            this.guessLeft = 10;
            this.wrongGuess = [];
            this.correctGuess = [];
            this.alphabet = ['a', 'b', 'c',
                'd', 'e', 'f',
                'g', 'h', 'i',
                'j', 'k', 'l',
                'm', 'n', 'o',
                'p', 'q', 'r',
                's', 't', 'u',
                'v', 'w', 'x',
                'y', 'z', ' '];

            game.underlines();
        
         
            document.getElementById('guessCounter').innerHTML = this.guessLeft;
        
            document.getElementById('score').innerHTML = this.countWins;
          
            document.getElementById('charGuess').innerHTML = this.wrongGuess;
          
        },

    //---Reset---//
        reset: function() {

            this.randomWord = this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
        //---Initial Values Reset---//

            // var targetDiv = document.getElementById("mediaTarget"); 
            // targetDiv.innerHTML = '<img class="displayMedia" id="imgHold" src="assets/images/glitchScreen.gif">';

            this.rightGuess = 0;
            this.guessLeft = 10;
            this.wrongGuess = [];
            this.correctGuess = [];
            this.alphabet = ['a', 'b', 'c',
                'd', 'e', 'f',
                'g', 'h', 'i',
                'j', 'k', 'l',
                'm', 'n', 'o',
                'p', 'q', 'r',
                's', 't', 'u',
                'v', 'w', 'x',
                'y', 'z', ' '];

            game.underlines();
        
            test = false;
            game.startGame();
    },

    //---Key Remove---/

        keyRemove: function(userIn){ 
            for (var i = 0; i < this.alphabet.length; i++) {
                if (userIn === this.alphabet[i] && test === true) { 
                    var splicedChar = this.alphabet.splice(i, 1);
                    game.check(userIn);
                    game.winConditions();
                }
            }
        },

    //---Underline Maker---//

        underlines: function(){
            this.splitArr = this.randomWord.split('');
            console.log(this.splitArr);
            this.countUnder = this.splitArr.length;

            for (var i = 0; i < this.countUnder; i++) {
                this.correctGuess.push('_ ');
                document.getElementById('currentWord').innerHTML = this.correctGuess;
            } 
            document.getElementById('currentWord').innerHTML = this.correctGuess.join(' ');
        },
    
    //---Media Match--//
        
        mediaMatcher: function(){
            var located = this.wordsList.indexOf(this.randomWord);
            console.log(located);
            var targetDiv = document.getElementById("mediaTarget"); 
                targetDiv.innerHTML = this.mediaArr[located];
        },

    //---KeyInput Compare---//

        check: function(userIn){
            if (this.randomWord.indexOf(userIn) > -1) {
                for(var i = 0; i < this.countUnder; i++){
                    if (this.splitArr[i] === userIn) {
                        this.rightGuess++;
                        this.correctGuess[i] = userIn
                        document.getElementById('currentWord').innerHTML = this.correctGuess.join(' ');
                        console.log(this.rightGuess);
                    }
                }
            }
            else {
                this.wrongGuess.push(userIn);
                this.guessLeft--;
                document.getElementById('guessCounter').innerHTML = this.guessLeft;
                document.getElementById('charGuess').innerHTML = this.wrongGuess;
            }
        },
    
    //---Winning Actions---//
        winConditions: function(){
            if (this.rightGuess === this.countUnder) {
                this.countWins++;
                document.getElementById('score').innerHTML = this.countWins;
                game.mediaMatcher();
                game.reset();
            }
            else if (this.guessLeft === 0) {
              
                this.countLoss++;
                alert('You need to upgrade your jukebox skills!');
                game.reset();
            }
        }
};

//--- Gameplay ---//
    game.startGame();
    document.onkeyup = function (event) {
        test = true; 
        var input = event.key;
        game.keyRemove(input);
        
    }