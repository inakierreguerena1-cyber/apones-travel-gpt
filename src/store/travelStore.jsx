const STORAGE_KEY = "apones-travel";

function getData(){

    const data =
    localStorage.getItem(STORAGE_KEY);

    if(!data){

        return {

            visits:{},
            favorites:[]

        };

    }

    const parsed = JSON.parse(data);

    return {

        visits: parsed.visits || {},
        favorites: parsed.favorites || []

    };

}

function saveData(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

    window.dispatchEvent(
        new Event("storage-update")
    );

}

export function getPlaceStatus(id){

    const data = getData();

    return data.visits[id] || {

        visits:[]

    };

}

export function addVisit(id,date){

    const data = getData();

    if(!data.visits[id]){

        data.visits[id]={

            visits:[]

        };

    }

    data.visits[id].visits.push({

        date

    });

    saveData(data);

    return data.visits[id];

}

export function removeVisit(id,index){

    const data = getData();

    if(!data.visits[id]){

        return {

            visits:[]

        };

    }

    data.visits[id].visits.splice(
        index,
        1
    );

    saveData(data);

    return data.visits[id];

}

export function isFavorite(id){

    const data = getData();

    return data.favorites.includes(id);

}

export function toggleFavorite(id){

    const data = getData();

    if(
        data.favorites.includes(id)
    ){

        data.favorites =
        data.favorites.filter(
            item => item !== id
        );

    }else{

        data.favorites.push(id);

    }

    saveData(data);

    return data.favorites;

}

/* ===========================
   HISTORIAL DE VIAJES
=========================== */

export function getAllStatuses(){

    const data = getData();

    return data.visits;

}