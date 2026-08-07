import { travelModes } from "../data/travelModes";


function TravelModes({
    onSelect
}){


return (

<section className="travel-modes">


<h2>

¿Qué tipo de viaje querés hacer?

</h2>



<div className="travel-mode-grid">


{
travelModes.map(mode=>(


<button

key={mode.id}

className="travel-mode-card"

onClick={()=>
onSelect(mode.filters)
}

>


<h3>

{mode.name}

</h3>


<p>

{mode.description}

</p>


</button>


))

}



</div>



</section>

);


}


export default TravelModes;