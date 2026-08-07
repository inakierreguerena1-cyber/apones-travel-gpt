import {
Link
} from "react-router-dom";


function TravelCard({city,progress}){


return (

<Link

to={`/city/${city.id}`}

className="travel-card"


>


<div className="travel-header">

<h3>
{city.name}
</h3>


<span>
{progress.percentage}%
</span>


</div>



<p>

{progress.completed}

&nbsp;/&nbsp;

{progress.total}

&nbsp;lugares recorridos

</p>



<div className="progress-bar">


<div

style={{

width:`${progress.percentage}%`

}}

/>


</div>


</Link>

)

}


export default TravelCard;