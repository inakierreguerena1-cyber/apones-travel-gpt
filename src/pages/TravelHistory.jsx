import { useMemo, useState } from "react";

import {
    getTravelHistory,
    getTravelStats,
    getCityProgress,
    getTimeline,
    getTravelDistance,
    filterHistory,
    sortHistory
} from "../utils/history";


function formatDate(date) {

    if (!date) return "";

    const [year, month, day] = date.split("-");

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



function TravelHistory() {


    const history = getTravelHistory();



    const [country, setCountry] = useState("all");

    const [province, setProvince] = useState("all");

    const [city, setCity] = useState("all");

    const [order, setOrder] = useState("recent");





    const countries = [

        ...new Set(
            history.map(
                item => item.country
            )
        )

    ]
        .filter(Boolean)
        .sort();




    const provinces = [

        ...new Set(

            history

                .filter(item =>

                    country === "all"

                    ||

                    item.country === country

                )

                .map(
                    item => item.province
                )

        )

    ]
        .filter(Boolean)
        .sort();





    const cities = [

        ...new Set(

            history

                .filter(item =>

                    (

                        country === "all"

                        ||

                        item.country === country

                    )

                    &&

                    (

                        province === "all"

                        ||

                        item.province === province

                    )

                )

                .map(
                    item => item.city
                )

        )

    ]
        .filter(Boolean)
        .sort();







    const filtered = useMemo(() => {


        return sortHistory(


            filterHistory(

                history,

                {

                    country,

                    province,

                    city

                }

            ),


            order


        );


    }, [

        history,

        country,

        province,

        city,

        order

    ]);







    const stats = useMemo(


        () => getTravelStats(filtered),


        [filtered]


    );

    const totalDistance = useMemo(

        () => getTravelDistance(filtered),

        [filtered]

    );






    const progress = useMemo(


        () => getCityProgress(filtered),


        [filtered]


    );







    const timeline = useMemo(


        () => getTimeline(filtered, order),


        [filtered]


    );







    return (


        <main className="container">


            <section className="history-page">



                <h1>

                    Mis viajes

                </h1>



                <p>

                    Toda tu actividad de viaje organizada automáticamente.

                </p>





                <section className="history-dashboard">



                    <article className="dashboard-card big">


                        <span className="dashboard-label">

                            Lugares visitados

                        </span>


                        <h2>

                            {stats.totalVisits}

                        </h2>


                        <small>

                            registrados en tu diario

                        </small>


                    </article>


                    <article className="dashboard-card">

                        <span className="dashboard-label">

                            Kilómetros recorridos

                        </span>


                        <h2>

                            {totalDistance}

                            {" km"}

                        </h2>


                    </article>


                    <article className="dashboard-card">


                        <span className="dashboard-label">

                            Ciudades

                        </span>


                        <h2>

                            {stats.totalCities}

                        </h2>


                    </article>





                    <article className="dashboard-card">


                        <span className="dashboard-label">

                            Países

                        </span>


                        <h2>

                            {stats.totalCountries}

                        </h2>


                    </article>





                    <article className="dashboard-card">


                        <span className="dashboard-label">

                            Última visita

                        </span>


                        <h3>


                            {

                                stats.lastVisit

                                    ?

                                    formatDate(
                                        stats.lastVisit
                                    )

                                    :

                                    "-"

                            }


                        </h3>


                    </article>



                </section>





                <section className="history-overall">


                    <div>


                        <h2>

                            Exploración global

                        </h2>



                        <p>

                            Descubriste

                            <strong>

                                {" "}

                                {stats.totalVisits}

                                {" "}

                            </strong>

                            lugares registrados en tu diario.

                        </p>


                    </div>




                    <div className="overall-progress">


                        <div

                            style={{

                                width:

                                    `${Math.min(

                                        100,

                                        Math.round(

                                            (

                                                stats.totalVisits

                                                /

                                                250

                                            )

                                            *

                                            100

                                        )

                                    )}%`

                            }}

                        />


                    </div>


                </section>





                <section className="history-filters">


                    <select

                        value={country}

                        onChange={e => {


                            setCountry(
                                e.target.value
                            );


                            setProvince(
                                "all"
                            );


                            setCity(
                                "all"
                            );


                        }}

                    >


                        <option value="all">

                            Todos los países

                        </option>



                        {

                            countries.map(country => (


                                <option

                                    key={country}

                                    value={country}

                                >

                                    {country}

                                </option>


                            ))

                        }


                    </select>





                    <select

                        value={province}

                        onChange={e => {


                            setProvince(
                                e.target.value
                            );


                            setCity(
                                "all"
                            );


                        }}

                    >


                        <option value="all">

                            Todas las provincias

                        </option>



                        {

                            provinces.map(province => (


                                <option

                                    key={province}

                                    value={province}

                                >

                                    {province}

                                </option>


                            ))

                        }


                    </select>





                    <select

                        value={city}

                        onChange={e =>

                            setCity(
                                e.target.value
                            )

                        }

                    >


                        <option value="all">

                            Todas las ciudades

                        </option>



                        {

                            cities.map(city => (


                                <option

                                    key={city}

                                    value={city}

                                >

                                    {city}

                                </option>


                            ))

                        }


                    </select>

                    <select

                        value={order}

                        onChange={e =>

                            setOrder(
                                e.target.value
                            )

                        }

                    >

                        <option value="recent">

                            Más recientes

                        </option>


                        <option value="oldest">

                            Más antiguos

                        </option>


                        <option value="city">

                            Por ciudad

                        </option>


                    </select>


                </section>





                <h2>

                    Ciudades exploradas

                </h2>





                <section className="history-grid">


                    {

                        progress.map(city => (


                            <article

                                key={city.id}

                                className="history-card"

                            >


                                {

                                    city.image && (

                                        <img

                                            src={city.image}

                                            alt={city.city}

                                            className="history-city-image"

                                        />

                                    )

                                }



                                <h3>

                                    {city.city}

                                </h3>



                                <p>

                                    {city.visited}

                                    {" / "}

                                    {city.total}

                                    {" lugares"}

                                </p>




                                <div className="progress-bar">


                                    <div

                                        style={{

                                            width:

                                                `${city.percent}%`

                                        }}

                                    />


                                </div>



                                <small>

                                    {city.percent}%

                                </small>



                            </article>


                        ))

                    }


                </section>







                <br />

                <br />







                <h2>

                    Línea de tiempo

                </h2>







                <section className="timeline-section">





                    {

                        timeline.length === 0 && (


                            <p className="empty-history">


                                Todavía no registraste visitas.


                            </p>


                        )


                    }







                    {

                        timeline.map(group => (



                            <article

                                key={

                                    group.date +

                                    group.city

                                }

                                className="history-card timeline-card"

                            >





                                <div className="timeline-header">



                                    <h2>

                                        {group.city}

                                    </h2>



                                    <span>

                                        {formatDate(
                                            group.date
                                        )}

                                    </span>



                                </div>







                                <p>

                                    {group.country}

                                </p>







                                <div className="history-location">



                                    {

                                        group.places.map(place => (



                                            <div

                                                key={
                                                    place.placeId
                                                }

                                            >


                                                {

                                                    place.image && (


                                                        <img

                                                            src={
                                                                place.image
                                                            }

                                                            alt={
                                                                place.place
                                                            }

                                                            className="timeline-image"

                                                        />


                                                    )

                                                }



                                                <span>

                                                    ✓ {place.place}

                                                </span>



                                            </div>



                                        ))

                                    }



                                </div>







                                <div className="history-date">


                                    {group.places.length}



                                    {


                                        group.places.length === 1

                                            ?

                                            " lugar visitado"

                                            :

                                            " lugares visitados"



                                    }



                                </div>





                            </article>



                        ))

                    }





                </section>






            </section>




        </main>



    );



}



export default TravelHistory;