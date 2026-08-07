import { locations } from "../data/locations";
import { attractions } from "../data/attractions";




function normalize(text) {

    return text
        ?.toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}





function getCityPlaces(cityId) {

    return attractions.filter(
        place =>
            place.city === cityId
    ).length;

}





function buildDatabase() {


    const cities = locations.map(city => {


        return {

            id: city.id,

            type: "city",

            name: city.name,

            image: city.image,

            country: city.country,

            province: city.province,

            municipality: city.municipality,


            distance:
                city.distance,


            category: [
                "Ciudad",
                ...(city.category || [])
            ],


            description:
                city.description,


            totalPlaces:
                getCityPlaces(city.id),


            recommendedDays:
                city.recommendedDays || 0,


            bestFor:
                city.bestFor || [],


            cityName:
                city.name


        };


    });






    const places = attractions.map(place => {


        const city =
            locations.find(
                item =>
                    item.id === place.city
            );



        return {


            id: place.id,


            type: "attraction",


            name: place.name,


            image:
                place.image || null,



            category:
                Array.isArray(place.category)
                    ?
                    place.category
                    :
                    place.category
                        ?
                        [
                            place.category
                        ]
                        :
                        [],
            description:
                place.description,



            country:
                city?.country,



            province:
                city?.province,



            distance:
                city?.distance,



            cityName:
                city?.name,



            cityId:
                city?.id,


            recommended:
                place.recommended || false



        };


    });






    return [

        ...cities,

        ...places

    ];

}





export function searchPlaces(filters) {


    let results =
        buildDatabase();





    /*
        BUSQUEDA
    */
console.log(results);

    const text =
        normalize(
            filters.search
        );





    if (text) {


        results =
            results.map(item => {


                let score = 0;



                const name =
                    normalize(
                        item.name
                    );


                const city =
                    normalize(
                        item.cityName
                    );


                const country =
                    normalize(
                        item.country?.name
                    );


                const province =
                    normalize(
                        item.province?.name
                    );



                const categories =
                    (item.category || []).map(
                        c => normalize(c)
                    );






                if (name === text) {

                    score += 100;

                }
                else if (name.startsWith(text)) {

                    score += 70;

                }
                else if (name.includes(text)) {

                    score += 40;

                }






                if (city === text) {

                    score += 60;

                }


                else if (
                    city?.includes(text)
                ) {

                    score += 30;

                }





                if (
                    country?.includes(text)
                ) {

                    score += 20;

                }




                if (
                    province?.includes(text)
                ) {

                    score += 10;

                }




                if (
                    categories.some(
                        c =>
                            c?.includes(text)
                    )
                ) {

                    score += 15;

                }






                return {

                    ...item,

                    score

                };


            });





        results =
            results.filter(
                item =>
                    item.score > 0
            );




        results.sort(
            (a, b) =>
                b.score - a.score
        );


    }









    /*
        FILTRO TIPO
    */


    if (
        filters.type &&
        filters.type !== "all"
    ) {


        results =
            results.filter(
                item =>
                    item.type === filters.type
            );


    }









    /*
        CATEGORIA
    */


    if (
        filters.category &&
        filters.category !== "all"
    ) {


        results =
            results.filter(
                item =>

                    item.category.includes(
                        filters.category
                    )

            );


    }









    /*
        DISTANCIA
    */


    if (
        filters.distance &&
        filters.distance !== "all"
    ) {


        results =
            results.filter(item => {


                const km =
                    item.distance?.km ?? 999;



                return km <=
                    Number(filters.distance);



            });


    }






    // =============================
    // PAIS
    // =============================

    if (

        filters.country &&
        filters.country !== "all"

    ) {

        results = results.filter(item =>

            item.country?.name === filters.country

        );

    }



    // =============================
    // PROVINCIA
    // =============================

    if (

        filters.province &&
        filters.province !== "all"

    ) {

        results = results.filter(item =>

            item.province?.name === filters.province

        );

    }



    // =============================
    // CIUDAD
    // =============================

    if (

        filters.city &&
        filters.city !== "all"

    ) {

        results = results.filter(item => {

            if (item.type === "city") {

                return item.name === filters.city;

            }

            return item.cityName === filters.city;

        });

    }


    // =============================
    // ORDENAMIENTO FINAL
    // =============================


    if (filters.sort) {


        switch (filters.sort) {



            case "places":


                results.sort(
                    (a, b) =>
                        (b.totalPlaces || 0) -
                        (a.totalPlaces || 0)
                );


                break;





            case "recommended":


                results.sort(
                    (a, b) => {


                        const scoreA =
                            (
                                (a.recommendedDays ? 10 : 0) +
                                (a.totalPlaces || 0)
                            );


                        const scoreB =
                            (
                                (b.recommendedDays ? 10 : 0) +
                                (b.totalPlaces || 0)
                            );



                        return scoreB - scoreA;


                    }
                );


                break;






            case "distance":


                results.sort(
                    (a, b) =>
                        (a.distance?.km || 9999) -
                        (b.distance?.km || 9999)
                );


                break;







            case "name":


                results.sort(

                    (a, b) =>

                        a.name.localeCompare(
                            b.name
                        )

                );


                break;


        }


    }



    return results;


}