import DestinationCard from "./DestinationCard";


function HorizontalSection({
    title,
    subtitle,
    items
}) {


    if(
        !items ||
        items.length === 0
    ){

        return null;

    }



    return (

        <section className="home-section horizontal-section">


            <div className="section-title">


                <h2>

                    {title}

                </h2>



                {
                    subtitle && (

                        <span>

                            {subtitle}

                        </span>

                    )

                }


            </div>





            <div className="horizontal-scroll">


                {
                    items.map(item=>(

                        <DestinationCard

                            key={
                                item.type + item.id
                            }

                            item={item}

                        />

                    ))
                }


            </div>



        </section>


    );


}


export default HorizontalSection;