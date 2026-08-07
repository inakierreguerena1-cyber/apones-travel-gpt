import {
useState
} from "react";


import {
attractions
} from "../data/attractions";


import {
locations
} from "../data/locations";


import {
Link
} from "react-router-dom";



function SearchBar(){


const [query,setQuery] = useState("");



const search =
query.length > 1
?
[

...locations.map(city=>({

type:"Ciudad",

name:city.name,

id:city.id

})),


...attractions.map(place=>({

type:place.category,

name:place.name,

id:place.id,

city:place.city

}))

]

.filter(item=>

item.name
.toLowerCase()
.includes(
query.toLowerCase()
)

)

.slice(0,8)

:

[];





return (

<div className="search-container">


<input

value={query}

onChange={
(e)=>setQuery(e.target.value)
}

placeholder="Buscar destino o lugar..."



/>



{
search.length > 0 && (

<div className="search-results">


{
search.map((item,index)=>(


<Link

key={index}

className="search-result"

to={
item.type==="Ciudad"
?
`/city/${item.id}`
:
`/attraction/${item.id}`
}


>


<strong>
{item.name}
</strong>


<span>
{item.type}
</span>



</Link>


))

}



</div>

)

}



</div>

)

}



export default SearchBar;