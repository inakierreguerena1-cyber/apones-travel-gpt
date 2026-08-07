import { attractions } from "../data/attractions";
import { locations } from "../data/locations";

import {
    getPlaceStatus
} from "../store/travelStore";



function visited(id){

    const status =
    getPlaceStatus(id);


    return (
        status &&
        status.visits &&
        status.visits.length > 0
    );

}




function buildPlaces(){


    const cities =

    locations.map(city=>({

        ...city,

        type:"city",

        category:"Ciudad",

        cityName:city.name,

        image:
        city.image ||
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900"

    }));





    const places =

    attractions.map(place=>{


        const city =
        locations.find(
            item=>item.id===place.city
        );



        return {

            ...place,

            type:"attraction",

            cityName:
            city?.name,


            country:
            city?.country,


            province:
            city?.province,


            distance:
            city?.distance,


            image:
            place.image ||
            city?.image ||
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900"

        };


    });



    return [

        ...cities,

        ...places

    ];


}





export function getRecommendations(filters={}){


    let places =
    buildPlaces();



    places =
    places.filter(
        item=>!visited(item.id)
    );





    return places.map(item=>{


        let score=0;





        // DISTANCIA

        const km =
        item.distance?.km || 999;



        if(km<=50)
            score+=50;

        else if(km<=100)
            score+=40;

        else if(km<=200)
            score+=30;

        else if(km<=500)
            score+=15;





        // DURACIÓN


        if(filters.days==="1"){


            if(km<=100)

                score+=40;


        }



        if(filters.days==="2"){


            if(km<=300)

                score+=35;


        }



        if(filters.days==="3"){


            if(km<=600)

                score+=35;


        }






        // CATEGORIA


        if(

            filters.category &&
            filters.category!=="all"

            &&

            item.category===filters.category

        ){

            score+=60;

        }







        // NATURALEZA TIENE BONUS

        if(
            item.category==="Naturaleza"
        ){

            score+=20;

        }







        // CIUDADES GRANDES

        if(item.totalPlaces){

            score +=
            item.totalPlaces;

        }







        return {

            ...item,

            score

        };



    })


    .sort(

        (a,b)=>

        b.score-a.score

    );


}







export function getNearbyPlaces(filters={}){


    return getRecommendations(filters)

    .filter(

        item=>

        item.distance?.km <=200

    )

    .slice(0,8);


}







export function getWeekendTrips(filters={}){


    return getRecommendations(filters)

    .filter(

        item=>

        item.distance?.km <=500

    )

    .slice(0,8);


}







export function getNatureTrips(filters={}){


    return getRecommendations({

        ...filters,

        category:"Naturaleza"

    })

    .slice(0,8);


}