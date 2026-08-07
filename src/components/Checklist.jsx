import { attractions } from "../data/attractions";
import { locations } from "../data/locations";
import AttractionCard from "./AttractionCard";


function Checklist({city}){


const cityPlaces = attractions.filter(
    place => place.city === city
);



const cityData = locations.find(
    location => location.id === city
);



return (

<section className="checklist">


<h2>
Lugares de {cityData ? cityData.name : city}
</h2>



<div className="attraction-grid">


{
cityPlaces.map(place=>(

<AttractionCard

key={place.id}

place={place}

/>

))

}


</div>


</section>

);

}


export default Checklist;