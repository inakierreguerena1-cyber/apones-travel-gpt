import { locations } from "../data/locations";
import { attractions } from "../data/attractions";


export function searchPlaces({
    text="",
    category="all",
    order="recommended"
}){


let cities = locations.map(city=>({

    ...city,

    type:"city",

    title:city.name,

    categories:city.categories || []

}));



let places = attractions.map(place=>({

    ...place,

    type:"attraction",

    title:place.name,

    categories:Array.isArray(place.category)
    ?
    place.category
    :
    [place.category]

}));




let results = [
    ...cities,
    ...places
];



const search =
text
.toLowerCase()
.trim();




if(search){


results =
results.filter(item=>{


const content = [

item.title,

item.description,

item.city,

item.name,

...(item.categories || []),

item.province?.name,

item.country?.name


]
.filter(Boolean)
.join(" ")
.toLowerCase();



return content.includes(search);



});


}




if(category !== "all"){


results =
results.filter(item=>

item.categories?.includes(category)

);


}





switch(order){


case "name":


results.sort(
(a,b)=>
a.title.localeCompare(b.title)
);


break;




case "places":


results.sort(
(a,b)=>
(b.totalPlaces || 0)
-
(a.totalPlaces || 0)
);


break;





case "distance":


results.sort(
(a,b)=>
(a.distance?.km || 9999)
-
(b.distance?.km || 9999)
);


break;





default:


results.sort(
(a,b)=>
(b.popularity || 0)
-
(a.popularity || 0)
);


}



return results;


}