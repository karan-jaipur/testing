import React,{ useEffect, useState } from 'react'

const Api = () => {
   // get
   const [data, setData] = useState([]);
   const get = () => {
     const requestOptions = {
       method: "GET",
       redirect: "follow",
     };
 
     fetch("http://localhost:9000/getted", requestOptions)
       .then((response) => response.json())
       .then((result) => setData(result.result))
       .catch((error) => console.error(error));
   };

   // update
   const [upda, setupda] = useState("");
   const [upda1, setupda1] = useState("");
   const updating = (id) => {
     const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
 
     const raw = JSON.stringify({
       username: upda,
       age: upda1,
     });
 
     const requestOptions = {
       method: "PUT",
       headers: myHeaders,
       body: raw,
       redirect: "follow",
     };
 
     fetch(`http://localhost:9000/updatingdata/${id}`, requestOptions)
       .then((response) => response.text())
       .then((result) => {
         console.log(result);
         get();
       })
       .catch((error) => console.error(error));
   };
 
 
 // delete
   const deletefun = (id) => {
    
 
     const requestOptions = {
       method: "DELETE",
       redirect: "follow",
     };
 
     fetch(
       `http://localhost:9000/deleteddata/${id}`,
       requestOptions
     )
       .then((response) => response.json())
       .then((result) => {console.log(result)
           get()
       
       }
       )
       .catch((error) => console.error(error));    
   };
 
   useEffect(() => {
     get();
   }, []);
 
  return (
    <div>
   <>
      <div
        style={{
          display: "flex",
          gap: "3rem",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ border: "1px dotted black", width: "100px" }}>
          {data.map((item, index) => (
            <div key={index}>
              <div>{item.name}</div>
              <div>{item.age}</div>
              <div>
                <input
                  type="text"
                  onChange={(e) => {
                    setupda(e.target.value);
                  }}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setupda1(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  updating(item._id);
                }}
              >
                update
              </button>
              <button onClick={()=>deletefun(item._id)}>delete</button>
            </div>
          ))}
        </div>
      </div>
    </>

    </div>
  )
}

export default Api
