import {
    useParams
  } from "react-router-dom";
  

export default function Feed() {
    let { id } = useParams();
    console.log("Aici");
    return <h1>Salut {id}</h1>
}