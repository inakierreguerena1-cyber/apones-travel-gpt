function LocationHeader({city}){


return (

<section className="location-card">


{
city.image && (

<img

src={city.image}

alt={city.name}

className="city-detail-image"

/>

)

}



<div className="flags">


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
{city.municipality?.name} · {city.province?.name} · {city.country?.name}
</p>



<div className="distance">

{city.distance?.km} km

<span>
{city.distance?.hours}
</span>

</div>



</section>

)

}


export default LocationHeader;