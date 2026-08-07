import {
Link
} from "react-router-dom";


function RecommendationCard({city}){


return (

<section className="recommendation-card">


<div>


<h2>
{city.name}
</h2>


<p>
{city.country.name}
</p>


<p>
{city.description}
</p>


<p>
{city.distance.km} km · {city.distance.hours}
</p>


</div>



<Link

to={`/city/${city.id}`}

className="button"

>

Explorar

</Link>



</section>

)

}


export default RecommendationCard;