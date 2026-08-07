import { useMemo, useState, useEffect } from "react";

import {
    searchPlaces
} from "../utils/explorer";

import {
    locations
} from "../data/locations";

import DestinationCard from "../components/DestinationCard";


function Home(){


const DEFAULT_FILTERS = {
    search:"",
    distance:"all",
    category:"all",
    type:"all",
    sort:"",
    country:"all",
    province:"all",
    city:"all"
};

const [filters, setFilters] = useState(
    DEFAULT_FILTERS
);


const [shuffleSeed] = useState(() => {

    const saved =
        sessionStorage.getItem(
            "homeShuffleSeed"
        );


    if(saved){

        return Number(saved);

    }


    const seed = Math.random();


    sessionStorage.setItem(
        "homeShuffleSeed",
        seed
    );


    return seed;

});

function update(key,value){

    setFilters(prev => {

        const updated = {
            ...prev,
            [key]: value
        };

        if(key === "country"){
            updated.province = "all";
            updated.city = "all";
        }

        if(key === "province"){
            updated.city = "all";
        }

        return updated;

    });

}






const results = useMemo(() => {

const data = searchPlaces(filters) || [];
    const noFilters =
        filters.search === "" &&
        filters.country === "all" &&
        filters.province === "all" &&
        filters.city === "all" &&
        filters.category === "all" &&
        filters.distance === "all" &&
        filters.type === "all" &&
        filters.sort === "";

if (!noFilters) return [...data];

const shuffled = [...data];

for (let i = shuffled.length - 1; i > 0; i--) {

    const random =
        Math.abs(
            Math.sin(
                (i + 1) * shuffleSeed * 100000
            )
        );

    const j = Math.floor(random * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

}

return shuffled;

}, [filters]);




const countries = [

    ...new Set(

        locations.map(

            location=>location.country.name

        )

    )

].sort();





const provinces = [

    ...new Set(

        locations

        .filter(location=>

            filters.country==="all"

            ||

            location.country.name===filters.country

        )

        .map(

            location=>location.province.name

        )

    )

].sort();





const cities = [

    ...new Set(

        locations

        .filter(location=>

            (

                filters.country==="all"

                ||

                location.country.name===filters.country

            )

            &&

            (

                filters.province==="all"

                ||

                location.province.name===filters.province

            )

        )

        .map(

            location=>location.name

        )

    )

].sort();





return (

<main className="container home">



<section className="home-hero">


<div className="hero-content">


<span className="hero-tag">

APONES TRAVEL

</span>


<h1>

¿A dónde querés viajar?

</h1>


<p className="hero-subtitle">

Buscá ciudades, atracciones y lugares para conocer.

</p>



<input

className="search-box"

placeholder="Buscar destino..."

value={filters.search}

onChange={

e=>

update(

"search",

e.target.value

)

}

/>


</div>


</section>

<section className="category-panel">


<h2>

Explorar por categoría

</h2>



<div className="chip-row">



<button
className="chip"
onClick={()=>
update(
"category",
"all"
)
}
>

Todo

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Naturaleza"
)
}
>

Naturaleza

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Shopping"
)
}
>

Shopping

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Animales"
)
}
>

Animales

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Aventura"
)
}
>

Aventura

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Historia"
)
}
>

Historia

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Museo"
)
}
>

Museo

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Arquitectura"
)
}
>

Arquitectura

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Castillo"
)
}
>

Castillo

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Monumento"
)
}
>

Monumento

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Plaza"
)
}
>

Plaza

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Gastronomía"
)
}
>

Gastronomía

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Paranormal"
)
}
>

Paranormal

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Religión"
)
}
>

Religión

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Playas"
)
}
>

Playas

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Deporte"
)
}
>

Deporte

</button>



<button
className="chip"
onClick={()=>
update(
"category",
"Teatro"
)
}
>

Teatro

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Carnaval"
)
}
>

Carnaval

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Fiesta Nacional"
)
}
>

Fiesta Nacional

</button>


<button
className="chip"
onClick={()=>
update(
"category",
"Estadio"
)
}
>

Estadio

</button>


<button
className="chip"
onClick={()=>
update(
"category",
"Lagunas"
)
}
>

Lagunas

</button>


<button
className="chip"
onClick={()=>
update(
"category",
"Jardines"
)
}
>

Jardines

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Termas"
)
}
>

Termas

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Costaneras"
)
}
>

Costaneras

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Parques"
)
}
>

Parques

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Parques Nacionales"
)
}
>

Parques Nacionales

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Reservas Naturales"
)
}
>

Reservas Naturales

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Bosques"
)
}
>

Bosques 

</button>

<button
className="chip"
onClick={()=>
update(
"category",
"Ruinas"
)
}
>

Ruinas 

</button>



</div>


</section>



<section className="home-filters">


<select

value={filters.country}

onChange={e=>
    update(
        "country",
        e.target.value
    )
}

>

<option value="all">

Todos los países

</option>


{

countries.map(country=>(

<option

key={country}

value={country}

>

{country}

</option>

))

}


</select>





<select

value={filters.province}

onChange={e=>
    update(
        "province",
        e.target.value
    )
}

>

<option value="all">

Todas las provincias

</option>


{

provinces.map(province=>(

<option

key={province}

value={province}

>

{province}

</option>

))

}


</select>





<select

value={filters.city}

onChange={e=>

update(
"city",
e.target.value
)

}

>

<option value="all">

Todas las ciudades

</option>


{

cities.map(city=>(

<option

key={city}

value={city}

>

{city}

</option>

))

}


</select>




<select

value={filters.type}

onChange={

e=>

update(

"type",

e.target.value

)

}

>


<option value="all">

Todos

</option>


<option value="city">

Ciudades

</option>


<option value="attraction">

Atracciones

</option>


</select>

<select

value={filters.distance}

onChange={

e=>

update(

"distance",

e.target.value

)

}

>


<option value="all">

Cualquier distancia

</option>


<option value="50">

Hasta 50 km

</option>


<option value="100">

Hasta 100 km

</option>


<option value="300">

Hasta 300 km

</option>


<option value="500">

Hasta 500 km

</option>


<option value="1000">

Hasta 1000 km

</option>


</select>





<select

value={filters.sort}

onChange={

e=>

update(

"sort",

e.target.value

)

}

>


<option value="">

Ordenar por

</option>


<option value="places">

Más lugares

</option>


<option value="distance">

Más cercanos

</option>


<option value="name">

Nombre A-Z

</option>


</select>


</section>





<section className="home-section">


<div className="section-title">


<h2>

Resultados

</h2>


<span>

{results.length} lugares

</span>


</div>





<div className="destination-grid">


{

results.map(item=>(


<DestinationCard

key={

item.type + item.id

}

item={item}

/>


))

}


</div>


</section>





{

results.length===0 && (


<p className="empty-history">

No encontramos lugares.

</p>


)

}



</main>


);


}


export default Home;