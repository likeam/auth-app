import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {

  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");
  
  useEffect(() =>{
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
    getMovieList();
  }, []);
  

  return (
    <div>
      <div>
      <Auth />
      </div>
      <div>
        {movieList.map((movi) =>{
          <div>
            <h1>{movi.title}</h1>
            <p>Date {movi.realseDate}</p>
          </div>
        })}
      </div>
    </div>

  

  );
}

export default App;
