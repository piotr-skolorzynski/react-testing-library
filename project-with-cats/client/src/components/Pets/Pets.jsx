import { useState, useEffect } from "react";
import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import axios from "axios";

const Pets = () => {

    const [cats, setCats] = useState([]);

    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats");
        setCats(response.data)
    };

    useEffect(() => {
        fetchCats();
    },[]);

    return (
        <div className="conatainer">
            <div className="app-container">
                <Filter />
                <Cards cats={cats}/>
            </div>
        </div>
    );
};

export default Pets;