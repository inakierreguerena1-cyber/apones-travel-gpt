import { useParams } from "react-router-dom";
import { useState } from "react";

import { attractions } from "../data/attractions";
import { locations } from "../data/locations";

import {
    getPlaceStatus,
    addVisit,
    removeVisit,
    isFavorite,
    toggleFavorite
} from "../store/travelStore";



function formatDate(date) {

    if (!date) {
        return "";
    }


    const [
        year,
        month,
        day
    ] = date.split("-");


    const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];


    return `${day} de ${months[Number(month) - 1]} de ${year}`;

}






function Attraction() {


    const { id } = useParams();


    const place =
        attractions.find(
            item => item.id === id
        );



    if (!place) {

        return (

            <main className="container">

                <h1>
                    Lugar no encontrado
                </h1>

            </main>

        );

    }




    const city =
        locations.find(
            item => item.id === place.city
        );




    const mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${place.name} ${city ? city.name : ""}`
        )}`;




    const [status, setStatus] =
        useState(
            getPlaceStatus(id) || {
                visits: []
            }
        );



    const [favorite, setFavorite] =
        useState(
            isFavorite(id)
        );



    const [visitDate, setVisitDate] =
        useState("");






    function handleVisited() {


        if (!visitDate) {

            alert(
                "Elegí la fecha de visita"
            );

            return;

        }



        const updated =
            addVisit(
                id,
                visitDate
            );



        setStatus(updated);


        setVisitDate("");

    }







    function handleFavorite() {


        toggleFavorite(id);


        setFavorite(!favorite);

    }







    function handleDeleteVisit(index) {


        if (
            !confirm(
                "¿Eliminar esta visita?"
            )
        ) {

            return;

        }



        const updated =
            removeVisit(
                id,
                index
            );



        setStatus(
            updated || {
                visits: []
            }
        );


    }









    return (


        <main className="container">


            <section className="attraction-detail">





                <h1>
                    {place.name}
                </h1>

                <div className="attraction-location">

                    <strong>
                        {city.name}
                    </strong>

                    <span>
                        {" · "}
                        {city.province.name}
                    </span>

                </div>


                {
                    place.image && (

                        <img

                            src={place.image}

                            alt={place.name}

                            className="attraction-detail-image"

                        />

                    )
                }














                <p>
                    {place.description}
                </p>







                <a

                    href={mapsUrl}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="maps-button"

                >

                    Abrir en Google Maps

                </a>









                <div className="date-picker">


                    <label>

                        Fecha de la visita

                    </label>





                    <input

                        type="date"

                        value={visitDate}

                        onChange={
                            e => setVisitDate(
                                e.target.value
                            )
                        }

                    />



                </div>









                <div className="actions">



                    <button

                        onClick={handleVisited}

                    >

                        Agregar visita

                    </button>







                    <button

                        onClick={handleFavorite}

                    >

                        {
                            favorite
                                ?
                                "En favoritos"
                                :
                                "Agregar a favoritos"
                        }


                    </button>




                </div>









                {
                    status.visits.length > 0 && (


                        <section className="travel-log">



                            <div className="travel-log-header">


                                <div>


                                    <h2>
                                        Mis visitas
                                    </h2>




                                    <span>

                                        {status.visits.length}


                                        {
                                            status.visits.length === 1
                                                ?
                                                " visita registrada"
                                                :
                                                " visitas registradas"
                                        }


                                    </span>



                                </div>



                            </div>








                            {
                                status.visits.map(
                                    (visit, index) => (


                                        <div

                                            key={index}

                                            className="visit-card"

                                        >


                                            <div className="visit-date">

                                                {formatDate(
                                                    visit.date
                                                )}

                                            </div>




                                            <div className="visit-number">


                                                {
                                                    index === 0
                                                        ?
                                                        "Primera visita"
                                                        :
                                                        `Visita #${index + 1}`
                                                }


                                            </div>







                                            <button

                                                className="delete-visit"

                                                onClick={() =>
                                                    handleDeleteVisit(index)
                                                }

                                            >

                                                Eliminar visita


                                            </button>




                                        </div>


                                    )

                                )

                            }






                        </section>


                    )

                }







            </section>



        </main>


    );


}



export default Attraction;