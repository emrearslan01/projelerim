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
//mainj olarak değişcek
window.addEventListener("mousemove",(e)=>{
   x=e.clientX;
   y=e.clientY;
   spaceship.style.left=x+"px"
   
   if(y>window.innerHeight/2)
      spaceship.style.top=y+"px"
      
});
   
   
window.addEventListener("click",()=>{
   velocity=velocity+0.5;
   let fireball =document.createElement("div");
   fireball.classList.add("fireball");
   fireball.style.left=x+"px";
   fireball.style.top=y-50+"px";
   laser.play()
   laser.currentTime=-2;
  
main.appendChild(fireball);

setInterval(()=>{
   
let fireballtop=parseInt(window.getComputedStyle(fireball).getPropertyValue("top"))
fireball.style.top=fireballtop -5+"px";
if(fireballtop<0){
      main.removeChild(fireball);

}
});
});

const enemymove=()=>{
   move=setInterval(()=>{
      let enemy=document.createElement("div")
      enemy.classList.add("enemy")
      let left=Math.floor(Math.random()*window.innerWidth-50)
      enemy.style.left=left+"px";
      enemy.style.top="px";
      main.appendChild(enemy);

let enemycount=document.querySelectorAll(".enemy")
for(let i=1;i<=enemycount.length;i++)
{
      
   let enemytop=parseInt(
      window.getComputedStyle(enemycount[i-1]).getPropertyValue("top"))
   let enemybottom=parseInt(
      window.getComputedStyle(enemycount[i-1]).getPropertyValue("top"))
      
   //METEORLARIN geliş sıklığı
   enemycount[i-1].style.top=enemytop+100+"px"

   //esas önemli kısmımız
   //değme kısımları temaslar tespit edilir
let mainframe=main.getBoundingClientRect();
if(enemybottom>mainframe.bottom){
         setTimeout((e)=>{
               main.removeChild(enemycount[i-1]);
           },600);
           /*
           boom.play()
           //çalar çalmaz dur
           boom.currentTime=0;
           */
           enemycount[i-1].classList.add("asteroidexplode");
        }
        
       }
       checkshipcollition();
      },450/velocity);
      
};

//çarpma kontrolü

const checkshipcollition=()=>{
   let enemies=document.querySelectorAll(".enemy");
   {
      for(let i=0;i<=enemy.length;i++){
         let enemy=enemies[i]
         let enemybounds=enemy.getBoundingClientRect()
         let shipbounds=spaceship.getBoundingClientRect()

         if(shipbounds.left<=enemybounds.left && shipbounds.right>=enemybounds.right 
            && shipbounds.top<=enemybounds.top && shipbounds.bottom>=enemybounds.bottom)
            {
               setTimeout(()=>{
                  spaceship.classList.remove("spaceshipexplode");
               })
               
               boom.play()
               boom.currentTime=0
               spaceship.classList.add("spaceshipexplode");
               //çarpınca hareket durur
               clearInterval(move);
            }
      }
   }
};

enemymove();

