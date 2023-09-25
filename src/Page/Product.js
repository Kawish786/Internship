import React, { useEffect, useState } from "react";
import axios from 'axios'


function Product() {
    const [data, setData]=useState([])
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState("");  /**        Search  States */

    useEffect(() => {
        // Replace 'your-non-json-link' with the actual URL
        axios.get('https://api.punkapi.com/v2/beers')
          .then((response) => {
            setData(response.data); // Use response.data for text or binary data
          })
          .catch((error) => {
            console.error('Axios error:', error);
          });
      }, []);

    //search query
    const handleSearch=(event)=>{
        const query = event.target.value.toLowerCase()
          setSearchQuery(query)
          if (query === "") {
            setFilteredData(data); // Reset to original data when the query is empty
          } else {
            const filtered = data.filter((e) =>
              e.name.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
          }
        }

  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
              value={searchQuery}
            />
          </form>
        </div>
      </nav>
        <div style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
        {filteredData.map((ele)=>(
            <div className="card" key={ele.id} style={{width:"18rem",margin:"10px"}}>
            <img src={ele.image_url} className="card-img-top" alt="..." style={{height:"30rem"}}/>
             <div className="card-body">
                    <p className="card-text">{ele.tagline}</p>
                    <h5>{ele.name}</h5>
                    <p>Since: {ele.first_brewed}</p>
              </div>
        </div>
        ))}
        </div>
    </>
  );
}

export default Product;
