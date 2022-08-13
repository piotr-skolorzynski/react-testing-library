import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import cats from "../../mocks/cats.json";

const Pets = () => {
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