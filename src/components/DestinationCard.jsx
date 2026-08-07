import { Link } from "react-router-dom";


function DestinationCard({item}){


const isCity =
item.type === "city";


const link =
isCity
?
`/city/${item.id}`
:
`/attraction/${item.id}`;



return (

<Link

to={link}

className="destination-card"

>


{
item.image ? (

<img

src={item.image}

alt={item.name}

className="destination-image"

/>

) : (

<div className="destination-no-image">

Sin imagen disponible

</div>

)
}



<div className="destination-content">



<span className="destination-type">

{
isCity
?
"Ciudad"
:
"Atracción"
}

</span>



<h2>

{item.name}

</h2>



<p>

{
item.cityName ||
item.province?.name ||
""
}

</p>



<div>

{
item.distance?.km || "?"
}

 km

</div>


</div>



</Link>


);


}


export default DestinationCard;