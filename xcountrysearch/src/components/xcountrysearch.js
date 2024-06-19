import React, { useState, useEffect } from "react";
const Countrycard = ({ countryname, imgSrc, imgAlt }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          width: "150px",
          border: "1px solid #eee",
          margin: ".5rem",
          padding: "1rem",
        }}
      >
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
      country.name.common.toLowerCase().includes(val)
    );
    filteredData.sort();
    setFlag(true);
    setFiltersearch(filteredData);
  };

  useEffect(() => {
    res();
  }, []);
  // console.log(apidata, "this is apidata");
  return (
    <div>
      <center>
        <input
          type="input"
          value={inputvalue}
          onChange={(e) => searchresult(e.target.value)}
          widht="600px"
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
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
