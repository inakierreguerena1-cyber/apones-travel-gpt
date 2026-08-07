import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Home from "../pages/Home";
import Navigation from "../components/Navigation";
import Stats from "../pages/Stats";
import City from "../pages/City";
import Attraction from "../pages/Attraction";
import Explore from "../pages/Explore";
import TravelHistory from "../pages/TravelHistory";
import Favorites from "../pages/Favorites";



function Router(){


return (


<BrowserRouter>


<Navigation />


<Routes>


<Route
path="/"
element={<Home />}
/>


<Route
path="/stats"
element={<Stats />}
/>


<Route
path="/city/:id"
element={<City />}
/>


<Route
path="/attraction/:id"
element={<Attraction />}
/>

<Route
path="/explore"
element={<Explore />}
/>


<Route
path="/history"
element={<TravelHistory />}
/>


<Route
path="/favorites"
element={<Favorites />}
/>


</Routes>


</BrowserRouter>


);


}


export default Router;