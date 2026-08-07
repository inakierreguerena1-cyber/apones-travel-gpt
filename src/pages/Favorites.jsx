import { useState, useEffect } from "react";

import { attractions } from "../data/attractions";
import AttractionCard from "../components/AttractionCard";

import {
    isFavorite
} from "../store/travelStore";



function Favorites(){


    const [favorites,setFavorites] = useState([]);



    function loadFavorites(){


        const places = attractions.filter(
            place => isFavorite(place.id)
        );


        setFavorites(places);


    }





    useEffect(()=>{


        loadFavorites();



        window.addEventListener(
            "storage-update",
            loadFavorites
        );



        window.addEventListener(
            "storage",
            loadFavorites
        );



        return ()=>{


            window.removeEventListener(
                "storage-update",
                loadFavorites
            );


            window.removeEventListener(
                "storage",
                loadFavorites
            );


        };


    },[]);







    return (

        <main className="container">


            <section className="favorites-page">


                <h1>
                    Mis favoritos
                </h1>




                {
                    favorites.length === 0 ?


                    <p className="empty-history">
                        Todavía no tenés lugares favoritos.
                    </p>


                    :


                    <div className="attraction-grid">


                        {
                            favorites.map(place=>(

                                <AttractionCard

                                    key={place.id}

                                    place={place}

                                />

                            ))
                        }


                    </div>


                }



            </section>


        </main>

    );


}



export default Favorites;