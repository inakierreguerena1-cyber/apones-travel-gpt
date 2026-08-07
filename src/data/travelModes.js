export const travelModes = [

    {
        id:"today",

        name:"Paseo de hoy",

        description:
        "Lugares cerca para conocer en pocas horas.",

        filters:{
            distance:"0-100",
            days:"1"
        }

    },


    {
        id:"weekend",

        name:"Escapada de fin de semana",

        description:
        "Destinos ideales para 2 o 3 días.",

        filters:{
            distance:"100-500",
            days:"2"
        }

    },


    {
        id:"vacation",

        name:"Vacaciones",

        description:
        "Destinos completos con muchas actividades.",

        filters:{
            distance:"all",
            days:"3"
        }

    },


    {
        id:"nature",

        name:"Naturaleza",

        description:
        "Paisajes, sierras y aire libre.",

        filters:{
            category:"Naturaleza"
        }

    },


    {
        id:"history",

        name:"Historia y cultura",

        description:
        "Ciudades históricas y lugares con identidad.",

        filters:{
            category:"Historia"
        }

    },


    {
        id:"food",

        name:"Gastronomía",

        description:
        "Sabores y experiencias locales.",

        filters:{
            category:"Gastronomía"
        }

    }

];