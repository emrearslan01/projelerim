const main = document.querySelector(".main")
const spaceship = document.querySelector(".spaceship")
const pscore = document.querySelector(".score p")

const modal = document.querySelector(".modal")
const endingmodal = document.querySelector(".modal2")


const startbutton = document.querySelector(".startgame")


//sound effects
let laser = new Audio("./voices/laser.mp3")
let boom = new Audio("./voices/boom.mp3")
let font = new Audio("./voices/font.mp3")
let gameover = new Audio("./voices/gameover.mp3")
//game
let move;
let score = 0;
let x, y;
let velocity = 1.00;


//spaceship moving

window.addEventListener("mousemove", (e) => {
   x = e.clientX;
   y = e.clientY;
   spaceship.style.left = x + "px"

   if (y > window.innerHeight / 2)
      spaceship.style.top = y + "px"

});


window.addEventListener("click", () => {
   velocity = velocity + 0.5;
   let fireball = document.createElement("div");
   fireball.classList.add("fireball");
   fireball.style.left = x + "px";
   fireball.style.top = y - 60 + "px";
   laser.play();
   laser.currentTime = -2;

   main.appendChild(fireball);

   setInterval(() => {

      let rocks = document.querySelectorAll(".rock");
      for (let i = 0; i < rocks.length; i++) {
         let rock = rocks[i];
         let rockbounds = rock.getBoundingClientRect();
         let fireballbounds = fireball.getBoundingClientRect();

         if (fireballbounds.left >= rockbounds.left
            && fireballbounds.right <= rockbounds.right
            && fireballbounds.top <= rockbounds.top
            && fireballbounds.bottom <= rockbounds.bottom) {

            main.removeChild(fireball);
            setTimeout(() => {
               main.removeChild(rock);
               score = score + 10;
               pscore.textContent = score;

            }, 500);
            boom.play();
            boom.currentTime = 0;
            rock.classList.add("asteroidexplode");

         }
      }


      let fireballtop = parseInt(window.getComputedStyle(fireball).getPropertyValue("top"))
      fireball.style.top = fireballtop - 7 + "px";
      if (fireballtop < 0) {
         main.removeChild(fireball);

      }
   });
});


const rockmove = () => {
   move = setInterval(() => {

      let v = 10;
      let rock = document.createElement("div");
      rock.classList.add("rock");
      let left = Math.floor(Math.random() * window.innerWidth - 50);
      rock.style.left = left + "px";
      rock.style.top = -50 + "px";
      main.appendChild(rock);
      let rockcount = document.querySelectorAll(".rock");
      for (let i = 1; i <= rockcount.length; i++) {
         font.play();
         let rocktop = parseInt(window.getComputedStyle(rockcount[i - 1]).getPropertyValue("top"));
         let rockbottom = parseInt(window.getComputedStyle(rockcount[i - 1]).getPropertyValue("top"))


         rockcount[i - 1].style.top = rocktop + 20 + "px";


         let mainframe = main.getBoundingClientRect();
         if (rockbottom > mainframe.bottom - 50) {
            setTimeout(() => {
               modal.classList.remove("closemodal");
               main.removeChild(rockcount[i - 1]);

            }, 600);
            boom.play();
            boom.currentTime = 0;
            rockcount[i - 1].classList.add("asteroidexplode");
            clearInterval(move);


         }

      }
      checkcraftcollition();
      font.pause();
      gameover.play();
      endmodal.classList.add("endmodal");

   }, 450 / velocity)

};

const checkcraftcollition = () => {
   let rocks = document.querySelectorAll(".rock");
   {
      for (let i = 0; i <= rocks.length; i++) {
         let rock = rocks[i];
         let rockbounds = rock.getBoundingClientRect();
         let craftbounds = spaceship.getBoundingClientRect();

         if (craftbounds.left <= rockbounds.right
            && craftbounds.right >= rockbounds.left
            && craftbounds.top <= rockbounds.bottom
            && craftbounds.bottom >= rockbounds.top) {
            setTimeout(() => {
               
               modal.classList.remove("closemodal");
               spaceship.classList.remove("spaceshipexplode");

            }, 450)
           
            boom.play();
            boom.currentTime = 0;
            spaceship.classList.add("spaceshipexplode");
            clearInterval(move);

            font.pause();
            gameover.play();


         }
         
      }
   }
};


startbutton.addEventListener("click", () => {
   document.querySelectorAll(".rock").forEach(item => {
      main.removeChild(item);
   })
   spaceship.style.left = "50%";
   spaceship.style.bottom = "-30px";
   velocity = 1.00;
   modal.classList.add("closemodal");
   
   score = 0;
   pscore.textContent = score;
   rockmove();
});

function exit() {
   window.close();
}








