import { getAllStatuses } from "../store/travelStore";
import { attractions } from "../data/attractions";
import { locations } from "../data/locations";


export function getTravelHistory(){

    const statuses = getAllStatuses();

    const visits = [];


    Object.entries(statuses).forEach(([placeId,status])=>{


        const attraction = attractions.find(

            place=>place.id===placeId

        );


        if(!attraction) return;



        const city = locations.find(

            location =>
            location.id===attraction.city

        );



        status.visits.forEach(visit=>{


            visits.push({

                placeId,

                place: attraction.name,

                category: attraction.category,

                date: visit.date,

                city: city?.name,

                cityId: city?.id,

                province: city?.province?.name,

                country: city?.country?.name,

                image: attraction.image


            });


        });


    });


    return visits;

}






export function getTravelStats(history){


    const countries = new Set(

        history.map(
            item=>item.country
        )

    );


    const cities = new Set(

        history.map(
            item=>item.city
        )

    );



    const dates = history

        .map(
            item=>item.date
        )

        .filter(Boolean)

        .sort(

            (a,b)=>

            new Date(a)-new Date(b)

        );



    return{


        totalVisits:

            history.length,


        totalCities:

            cities.size,


        totalCountries:

            countries.size,


        firstVisit:

            dates[0] || null,


        lastVisit:

            dates[dates.length-1] || null


    };


}







export function getCityProgress(history){


    return locations.map(city=>{


        const visited = history.filter(

            item=>

            item.cityId===city.id

        );



        const unique = new Set(

            visited.map(
                item=>item.placeId
            )

        );



        const total = attractions.filter(

            attraction=>

            attraction.city===city.id

        ).length;



        return{


            id:city.id,

            city:city.name,

            image:city.image,

            visited:unique.size,

            total,


            percent:

                total===0

                ?

                0

                :

                Math.round(

                    unique.size*100/total

                )


        };



    })


    .filter(

        city=>

        city.total>0

    )


    .sort(

        (a,b)=>

        b.percent-a.percent ||

        b.visited-a.visited

    );


}







export function getTimeline(history,order="recent"){


    const groups={};



    history.forEach(item=>{


        const key =

            `${item.date}-${item.city}`;



        if(!groups[key]){


            groups[key]={


                date:item.date,

                city:item.city,

                country:item.country,

                places:[]


            };


        }



        groups[key].places.push(item);



    });



    return sortHistory(

        Object.values(groups),

        order,

        true

    );


}








export function filterHistory(history,filters){


    return history.filter(item=>{


        if(

            filters.country!=="all"

            &&

            item.country!==filters.country

        ){

            return false;

        }



        if(

            filters.province!=="all"

            &&

            item.province!==filters.province

        ){

            return false;

        }



        if(

            filters.city!=="all"

            &&

            item.city!==filters.city

        ){

            return false;

        }



        return true;


    });


}








export function sortHistory(history,order,isTimeline=false){


    const sorted=[...history];



    switch(order){



        case "oldest":


            return sorted.sort(

                (a,b)=>

                new Date(a.date)

                -

                new Date(b.date)

            );





        case "city":


            return sorted.sort(

                (a,b)=>

                (a.city || "")

                .localeCompare(

                    b.city || "",

                    "es"

                )

            );





        case "recent":


        default:


            return sorted.sort(

                (a,b)=>

                new Date(b.date)

                -

                new Date(a.date)

            );



    }



}








export function getTravelDistance(history){


    const visitedCities=[


        ...new Set(

            history.map(

                item=>item.cityId

            )

        )


    ];



    let total=0;



    visitedCities.forEach(cityId=>{


        const city = locations.find(

            location=>

            location.id===cityId

        );



        if(city?.distance?.km){


            total += city.distance.km * 2;


        }



    });



    return total;


}