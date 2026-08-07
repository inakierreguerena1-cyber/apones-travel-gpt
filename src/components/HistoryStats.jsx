function formatDate(date){

    if(!date){

        return "-";

    }

    const [year,month,day]=date.split("-");

    const months=[
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

    return `${day} de ${months[Number(month)-1]} de ${year}`;

}

function HistoryStats({stats}){

    return(

        <section className="travel-dashboard">

            <article className="dashboard-card">

                <h2>

                    {stats.totalVisits}

                </h2>

                <span>

                    Lugares visitados

                </span>

            </article>

            <article className="dashboard-card">

                <h2>

                    {stats.totalCities}

                </h2>

                <span>

                    Ciudades exploradas

                </span>

            </article>

            <article className="dashboard-card">

                <h2>

                    {stats.totalCountries}

                </h2>

                <span>

                    Países

                </span>

            </article>

            <article className="dashboard-card">

                <h2>

                    {

                        stats.firstVisit

                        ?

                        formatDate(stats.firstVisit)

                        :

                        "-"

                    }

                </h2>

                <span>

                    Primera visita

                </span>

            </article>

            <article className="dashboard-card">

                <h2>

                    {

                        stats.lastVisit

                        ?

                        formatDate(stats.lastVisit)

                        :

                        "-"

                    }

                </h2>

                <span>

                    Última visita

                </span>

            </article>

        </section>

    );

}

export default HistoryStats;