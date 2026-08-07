import { locations } from "../data/locations";
import { attractions } from "../data/attractions";


const STORAGE_KEY = "apones-travel";



function getSavedData(){

    const data =
    localStorage.getItem(STORAGE_KEY);


    if(!data){

        return {

            visits:{},

            favorites:[]

        };

    }


    return JSON.parse(data);

}




export function getStatistics(){


    const data =
    getSavedData();



    const visitedPlaces =
    Object.values(data.visits)
    .filter(
        item =>
        item.visits &&
        item.visits.length > 0
    );



    const places =
    visitedPlaces.length;



    const visitedCities =
    new Set();



    const visitedCountries =
    new Set();



    const visitedProvinces =
    new Set();




    attractions.forEach(place=>{


        const saved =
        data.visits[place.id];



        if(
            saved &&
            saved.visits &&
            saved.visits.length > 0
        ){


            const city =
            locations.find(
                item =>
                item.id === place.city
            );



            if(city){


                visitedCities.add(
                    city.name
                );


                visitedCountries.add(
                    city.country.name
                );


                visitedProvinces.add(
                    city.province.name
                );


            }


        }


    });




    const kilometers =

    locations

    .filter(
        city =>
        visitedCities.has(city.name)
    )

    .reduce(
        (total,city)=>
        total + city.distance.km,
        0
    );




    return {


        places,


        cities:
        visitedCities.size,


        countries:
        visitedCountries.size,


        provinces:
        visitedProvinces.size,


        kilometers


    };


}