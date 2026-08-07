import {attractions} from "../data/attractions";
import AttractionCard from "./AttractionCard";


function AttractionList(){


const places =
attractions.filter(
item=>item.city==="tandil"
);



return (

<section className="attractions">


<h2>
Lugares de Tandil
</h2>


<div className="attractions-grid">


{
places.map(place=>(

<AttractionCard
key={place.id}
place={place}
/>

))

}


</div>


</section>

)

}


export default AttractionList;