import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContexts";

//component = any function of javascript that returns jsx code
//component always star with a capital letter.
//JSX = JS + HTML looking like code

//whenever we return something from a component it needs to have just one parent element.
//only one root element can be returned and anything can be inside of it. cant return multiple things at the same level.

//if you really wanna return two divs from the same component use FRAGMENT (<> </>) (empty html tag which wraps the different components)
// the first set of braces denote that we are referring to a variable and the second set of braces are the object we are going to pass.

//understand conditional rendering - certain things will be displayed only if some condition is true
//two ways - 1 = (use ? :) - 2 = (condition && statement)
function App() {
  const movieNumber = 3;

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

//this is a basic component - define a function starting with a capital letter - returns some kind of JSX code - this can be reused multiple times - what a component does can be understood by the name of the component.
//PROPS - property of the component - a paramenter we pass to the component to customise its behaviour.
// function Text({display}) {
//   return (
//     <div>
//       <p>{display}</p>
//     </div>
//   );
// }

export default App;
