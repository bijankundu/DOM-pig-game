let currentScore,activePlayer,gamePlaying,scores;

initial();

/*This encounters when 'roll dice' button is clicked*/
$(".btn-roll").click(()=>{
    if(gamePlaying)
    {
        let dice1,dice2;

        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        
        let dice1_DOM = $("#dice-1");
        let dice2_DOM = $("#dice-2");

        dice1_DOM.attr("src",'dice-' + dice1 + '.png');
        dice2_DOM.attr("src",'dice-' + dice2 + '.png');

        dice1_DOM.css("display", "block");
        dice2_DOM.css("display", "block");
        
        if(dice1 != 1 && dice2 != 1)
        {
            currentScore+= (dice1 + dice2);

            $("#current-" + activePlayer).text(currentScore);
        }
        else
            nextPlayer();
    }
});

$(".btn-hold").click(()=>{
    if(gamePlaying)
    {
        scores[activePlayer]+= currentScore;
        $("#score-" + activePlayer).text(scores[activePlayer]);
        console.log(currentScore);
        console.log(activePlayer);
        
        let input = $(".final-score").val();
        let winningScore

        if(input)
            winningScore = input;
        else
            winningScore = 0;

        if(winningScore <= scores[activePlayer])
        {
            $("#name-" + activePlayer).text("Winner!");
            $(".dice").css("display", "none");
            $(".player-" + activePlayer +"-panel").removeClass("active");
            $(".player-" + activePlayer + "-panel").addClass("winner");
            gamePlaying = false;
        }
        else
            nextPlayer();
    }
});
/*Function to transfer control to the next player*/
function nextPlayer(){
    activePlayer === 2 ? activePlayer = 1 : activePlayer = 2;
    currentScore = 0;

    $("#current-1").text("0");
    $("#current-2").text("0");

    $(".player-1-panel").toggleClass("active");
    $(".player-2-panel").toggleClass("active");
}

$(".btn-new").click(initial);

/*Funtion to intialize vales*/
function initial(){
    scores = [0,0,0];
    activePlayer = 1;
    currentScore = 0;
    gamePlaying = true;
    $(".dice").css("display", "none");
    $("#score-1").text("0");
    $("#score-2").text("0");
    $("#current-1").text("0");
    $("#current-2").text("0");
    $("#name-1").text("Player 1");
    $("#name-2").text("Player 2");
    $(".player-1-panel").removeClass("winner active");
    $(".player-2-panel").removeClass("winner active");
    $(".player-1-panel").addClass("active");
}