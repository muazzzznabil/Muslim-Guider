const findLocation = () => {

   const status = document.querySelector(".status");

   const success = (position)=>{
    console.log(position)
   } 
   const error =()=>{
       status.textContent("Unable to retrieve your location");
   }

   navigator.geolocation.getCurrentPosition(success,error);

}

document.querySelector('.findCoords').addEventListener('click',findLocation);