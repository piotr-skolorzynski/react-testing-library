import { useState, useEffect, createContext } from "react";
import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import axios from "axios";

export const PetsContext = createContext({
        cats: [],
        setCats: () => {}
});

const Pets = () => {

    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);

    const [filters, setFilters] = useState({ 
                                            gender: "any",
                                            favoured: "any"
                                        });

    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats");
        setCats(response.data)
    };

    useEffect(() => {
        fetchCats();
    },[]);

    useEffect(() => {
        let catsFiltered = [...cats];
        
        if (filters.gender !== "any") {
            catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender);
        };

        if (filters.favoured !== "any") {
            catsFiltered = catsFiltered.filter(cat => cat.favoured === filters.favoured);
        };

        setFilteredCats(catsFiltered);
    },[filters, cats]);

    return (
        <div className="conatainer">
            <div className="app-container">
                <PetsContext.Provider value={{cats: filteredCats, setCats}}>
                    <Filter filters={filters} setFilters={setFilters} />
                    <Cards />
                </PetsContext.Provider>
            </div>
        </div>
    );
};

export default Pets;