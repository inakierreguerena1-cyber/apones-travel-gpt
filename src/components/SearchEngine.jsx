import {useState} from "react";

import {
searchPlaces
} from "../engine/searchEngine";


import {
Link
} from "react-router-dom";



function SearchEngine(){


const [text,setText]=useState("");

const [category,setCategory]=useState("all");

const [order,setOrder]=useState("recommended");




const results =
searchPlaces({
    text,
    category,
    order
});





return (

<section className="search-engine">



<input

className="search-box"

placeholder="Buscar ciudades, lugares, museos..."

value={text}

onChange={
e=>setText(e.target.value)
}

/>




<div className="home-filters">


<select

value={category}

onChange={
e=>setCategory(e.target.value)
}

>


<option value="all">
Todas las categorías
</option>


<option>
Naturaleza
</option>


<option>
Historia
</option>


<option>
Museo
</option>


<option>
Arquitectura
</option>


<option>
Monumento
</option>


<option>
Plaza
</option>


<option>
Gastronomía
</option>


<option>
Aventura
</option>


<option>
Deporte
</option>



</select>





<select

value={order}

onChange={
e=>setOrder(e.target.value)
}

>



<option value="places">
Más lugares
</option>

<option value="distance">
Más cerca
</option>


<option value="name">
Nombre A-Z
</option>


</select>



</div>







<div className="destination-grid">



{

results.slice(0,12).map(item=>(



<Link

key={`${item.type}-${item.id}`}

to={
item.type==="city"
?
`/city/${item.id}`
:
`/attraction/${item.id}`
}

className="destination-card"

>


<h2>
{item.title}
</h2>


<p>

{
item.type==="city"
?
"Ciudad"
:
"Destino"

}

</p>


{
item.description &&

<div>
{item.description}
</div>

}



</Link>



))

}



</div>




</section>

);


}



export default SearchEngine;