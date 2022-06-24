const main=document.querySelector(".main")
const spaceship=document.querySelector(".spaceship")
const pscore=document.querySelector(".score p")

//sound effects
let laser=new Audio("./voices/laser.mp3")
let boom=new Audio("./voices/boom.mp3")

//game
let move
let score=0
let x,y
let velocity=1.00

//spaceship moving
 //ridvan.ozpamukcu@forte.com.tr
window.addEventListener("mousemove",(e)=>{
   
   x=e.clientX;
   y=e.clientY;
   spaceship.style.left=x+"px"

   
   spaceship.style.top=y+"px"


});