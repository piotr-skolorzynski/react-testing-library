import "./Filter.css";

const Filter = ({filters, setFilters}) => {
    return(
        <div className="pet-filter-container">
            <div className="filter-container">
                <label htmlFor="favourite">Favourite</label>
                <select name="favourite"
                        id="favourite"
                        className="form-select"
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                favoured: e.target.value === "favourite" ? true : false
                            })
                        }}
                >
                    <option value="any">Any</option>
                    <option value="favourite">Favourite</option>
                    <option value="not favourite">Not favourite</option>
                </select>

                <label htmlFor="gender">Gender</label>
                <select name="gender"
                        id="gender"
                        className="form-select"
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                gender: e.target.value
                            })
                        }}
                  >
                    <option value="any">Any</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>
        </div>
    )
};

export default Filter;