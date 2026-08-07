import {
getStatistics
} from "../utils/statistics";


function Stats(){


const stats =
getStatistics();



return (

<main className="container">


<section className="stats-page">


<p className="small">
APONES TRAVEL
</p>


<h1>
Mi recorrido
</h1>



<div className="stats-grid">



<div className="stat-card">

<h2>
{stats.places}
</h2>

<p>
Lugares visitados
</p>

</div>




<div className="stat-card">

<h2>
{stats.cities}
</h2>

<p>
Ciudades
</p>

</div>




<div className="stat-card">

<h2>
{stats.provinces}
</h2>

<p>
Provincias
</p>

</div>




<div className="stat-card">

<h2>
{stats.countries}
</h2>

<p>
Países
</p>

</div>




<div className="stat-card">

<h2>
{stats.kilometers}
</h2>

<p>
Kilómetros recorridos
</p>

</div>



</div>


</section>


</main>

)

}


export default Stats;