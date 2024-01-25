import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc} from "firebase/firestore";

import './App.css';

function App() {

  const [movieList, setMovieList] = useState([]);

  const [addMovieTitle, setAddMovieTitle] = useState('');
  const [addMovieDate, setAddMovieDate] = useState(0);
  const [addMovieAward, setAddMovieAward] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async() => {
      

    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) =>({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch(err){
      console.error(err);
    }
    
  }
  
  useEffect(() =>{

    getMovieList();

  }, []);



  const onSubmitMovie = async() => {
      try{
      await addDoc(moviesCollectionRef, {
        title: addMovieTitle,
        releaseDate: addMovieDate,
        reciveAnAskar: addMovieAward,
      });
      getMovieList();
    } catch(err){
        console.error(err);
      }
  }

  const deleteMovie = async(id) => {
      try{
      const movieDoc = doc(db, 'movies', id );
      await deleteDoc(movieDoc);
      getMovieList();
    } catch(err){
      console.error(err);
    }

  } 
 

  return (
    <div className="App">   
      <Auth />      
      <div className="movieInput container">
        <input 
          placeholder="Movie Name..." 
          onChange={(e) => setAddMovieTitle(e.target.value)}
        />
        <input 
          placeholder="Release Deate...." 
          type="number" 
          onChange={(e) => setAddMovieDate(Number(e.target.value))}
        />
        <input 
          type="checkbox" 
          
          onChange={(e) => setAddMovieAward(e.target.value)}
        />
        <label>Recive Askar</label>
        <button onClick={onSubmitMovie} >Add Movie</button>
      </div>
      <div >
      <div>
        {movieList.map((movi) =>(
         <div > 
           <div >
            <h1 style={{color: movi.reciveAnAskar ? 'green' : 'blue'}}>  {movi.title} </h1>
            <p>Date :{movi.releaseDate} </p>
            <button onClick={() => deleteMovie(movi.id)}>Delete Movie</button>
          </div>
         </div>
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default App;
