import { locations } from "../data/locations";
import { attractions } from "../data/attractions";
import { Link } from "react-router-dom";


function Explore(){


return (

<main className="container">


<section className="explore-page">


<h1>
Explorar destinos
</h1>



<section className="location-grid">


{
locations.map(city=>{


const totalPlaces =
attractions.filter(
    place => place.city === city.id
).length;



return (


<Link

key={city.id}

to={`/city/${city.id}`}

className="location-card"

>


<img

src={city.image}

alt={city.name}

className="location-image"

/>



<div className="location-content">



<div className="location-flags">


{
city.country?.flag && (

<img

src={city.country.flag}

alt={city.country.name}

/>

)

}



{
city.province?.flag && (

<img

src={city.province.flag}

alt={city.province.name}

/>

)

}



{
city.municipality?.flag && (

<img

src={city.municipality.flag}

alt={city.municipality.name}

/>

)

}



</div>





<h2>
{city.name}
</h2>



<p>

{city.province?.name}

{" · "}

{city.country?.name}

</p>




<div className="location-info">


<span>
{city.distance.km} km
</span>



<span>
{city.distance.hours}
</span>



<span>
{totalPlaces} lugares
</span>


</div>



</div>



</Link>


)


})

}


</section>


</section>


</main>

)

}


export default Explore;