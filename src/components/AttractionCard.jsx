import {
    getPlaceStatus
} from "../store/travelStore";


import {
    Link
} from "react-router-dom";



function AttractionCard({place}){


const status =
getPlaceStatus(place.id) || {
    visits:[]
};



const visited =
status.visits &&
status.visits.length > 0;



return (

<Link

to={`/attraction/${place.id}`}

className="attraction-card"

>


<div className="card-header">


<h3>
{place.name}
</h3>



<span className={visited ? "visited" : "pending"}>

{
visited
?
"Visitado"
:
"Pendiente"
}

</span>


</div>



<p>
{place.description}
</p>





{
visited && (

<small>

{status.visits.length}

{

status.visits.length === 1
?
" visita"
:
" visitas"

}

</small>

)

}



</Link>

)

}


export default AttractionCard;