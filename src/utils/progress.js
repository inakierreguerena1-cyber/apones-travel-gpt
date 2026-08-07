import {attractions} from "../data/attractions";
import {getPlaceStatus} from "../store/travelStore";


export function getCityProgress(cityId){


    const cityPlaces =
    attractions.filter(
        place => place.city === cityId
    );


    let completed = 0;


    cityPlaces.forEach(place=>{


        const status =
        getPlaceStatus(place.id);



        if(
            status &&
            status.visits &&
            status.visits.length > 0
        ){

            completed++;

        }


    });



    return {

        completed,

        total: cityPlaces.length,

        percentage:
        cityPlaces.length > 0
        ?
        Math.round(
            (completed / cityPlaces.length) * 100
        )
        :
        0

    };


}