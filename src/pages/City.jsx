import {
useParams
} from "react-router-dom";

import {useState,useEffect} from "react";

import {locations} from "../data/locations";
import Checklist from "../components/Checklist";
import LocationHeader from "../components/LocationHeader";

import {getCityProgress} from "../utils/progress";


function City(){


const {id} = useParams();


const city =
locations.find(
item => item.id === id
);



const [progress,setProgress] =
useState({
    completed:0,
    total:0,
    percentage:0
});



useEffect(()=>{


function updateProgress(){

    const data =
    getCityProgress(id);


    console.log("PROGRESO:",data);


    setProgress(data);

}



updateProgress();



window.addEventListener(
"storage-update",
updateProgress
);



return ()=>{

window.removeEventListener(
"storage-update",
updateProgress
);

};


},[id]);





if(!city){

return <h1>Ciudad no encontrada</h1>;

}



return (

<main className="container">


<LocationHeader city={{...city, categories: []}}/>



<section className="city-description">

<p>
{city.description}
</p>

</section>












<section className="city-progress">


<h2>
Progreso del viaje
</h2>



<p>

{progress.completed}

&nbsp;/&nbsp;

{progress.total}

&nbsp;lugares completados

</p>




<div className="progress-bar">


<div

style={{

width:`${progress.percentage}%`

}}

/>


</div>




<p>
{progress.percentage}% completado
</p>



</section>






<Checklist city={city.id}/>




</main>

);


}


export default City;