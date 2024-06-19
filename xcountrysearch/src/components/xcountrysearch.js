import React, { useState, useEffect } from "react";
import "./xcountrysearch.css";
const Countrycard = ({ countryname, imgSrc, imgAlt }) => {
  return (
    <>
      <div className="countryCard">
        <img src={imgSrc} alt={imgAlt} width="100px" height="100px" />
        <h4>{countryname}</h4>
      </div>
    </>
  );
};

const Xcountrysearch = () => {
  const [apidata, setApidata] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [filtersearch, setFiltersearch] = useState([]);
  const [flag, setFlag] = useState(false);
  const API_CALL = "https://restcountries.com/v3.1/all";
  let res = async () => {
    try {
      let response = await fetch(API_CALL);
      let data = response.json();
      console.log(data);
      data.then((res) => setApidata(res));
    } catch (error) {
      console.log(error);
    }
  };
  const searchresult = (val) => {
    setInputvalue(val);
    let filteredData = apidata.filter((country) =>
      country.name.common.toLowerCase().includes(val.toLowerCase())
    );
    filteredData.sort();
    setFlag(true);
    setFiltersearch(filteredData);
  };

  useEffect(() => {
    res();
  }, []);
  console.log(apidata, "this is apidata");

  return (
    <div>
      <div class="container">
        <center>
          <input
            type="text"
            value={inputvalue}
            onChange={(e) => searchresult(e.target.value)}
            placeholder="Search for Countries"
          />
        </center>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {flag
          ? filtersearch.map((val, ind) => (
              <Countrycard
                countryname={val.name.common}
                imgSrc={val.flags.png}
                imgAlt={val.flags.alt}
                key={ind}
              />
            ))
          : apidata.map((val, ind) => (
              <Countrycard
                countryname={val.name.common}
                imgSrc={val.flags.png}
                imgAlt={val.flags.alt}
                key={ind}
              />
            ))}
      </div>
    </div>
  );
};

export default Xcountrysearch;
