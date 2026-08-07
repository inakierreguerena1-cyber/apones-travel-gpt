export function formatDate(date){


const [year,month,day] =
date.split("-");


return new Date(
    year,
    month - 1,
    day
).toLocaleDateString(
    "es-AR",
    {
        day:"numeric",
        month:"long",
        year:"numeric"
    }
);


}