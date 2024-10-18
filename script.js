const form = document.querySelector(".form");
const result = document.querySelector(".result");

const userName = document.querySelector("#name");
const victories = document.querySelector("#victories");
const defeats = document.querySelector("#defeats");

let rankNumber = 0;

const rankings = [
   ["Ferro", 0, 10],
   ["Bronze", 11, 20],
   ["Prata", 21, 50],
   ["Ouro", 51, 80],
   ["Diamante", 81, 90],
   ["Lendário", 91, 100],
   ["Imortal", 101, Infinity]
];

let player = {
   userName: "",
   victories: 0,
   defeats: 0,
   ranking: ""
};

form.addEventListener(("submit"), (e) => {
   e.preventDefault();
   if (validateForm()){
      updatePlayerInfos();
      updateUI();
   } else{
      window.alert("Insira um número válido!")
   }
   
   
})

const validateForm = () => {
   if (victories.value < 0 || defeats.value < 0){
      victories.value = "";
      defeats.value = "";
      return false;
   } else {
      return true;
   }
}

const updatePlayerInfos = () => {
   player.userName = userName.value;
   player.victories = parseInt(victories.value);
   player.defeats = parseInt(defeats.value);
   player.ranking = calculateRank(player.victories, player.defeats);
}

const calculateRank = (wins, losses) => {
   rankNumber = wins - losses;
   // logical problem in the if condition, there's no element before the first in the rankings array, returning undefined.
   // for (let i = 0; i <= rankings.length - 1; i++){
   //    if (rankNumber < 10){
   //       return rankings[i][0];
   //    } else if (rankNumber <= rankings[i][1] && rankNumber > rankings[i - 1][1] && rankings[i - 1][1] != undefined){
   //       return rankings[i][0];
   //    }
   // }

   // logic developed with GPT chat support
   for (let i = rankings.length - 1; i >= 0; i--) {
      if (rankNumber >= rankings[i][1] && rankings[i][2]) {
         return rankings[i][0];
      }
   }
}; 

const updateUI = () => {
   result.innerHTML = `<p>Você tem um saldo de ${rankNumber}</p><p>Seu ranking é ${player.ranking}</p>!`;
}


