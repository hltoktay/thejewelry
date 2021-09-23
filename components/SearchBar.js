import React, { useState, useEffect } from 'react';
import filterSearch from '../utils/filterSearch';
import { useRouter } from 'next/router'

export default function SearchBar() {

      
    return (
        <div className="m-1">
               <form className="d-flex">
                  <input
                    style={{
                      border: "1px solid #e7e5e1",
                      borderRadius: "5px",
                      paddingRight: "15px"
                    }}
                    className="form-control btn-sm input-sm"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                   
                  />
                  <button
                    style={{
                      border: "1px solid black",
                      borderRadius: "25%",
                      backgroundColor: "grey",
                      color: "white",
                      fontSize: "12px",
                      marginLeft: "10px",
                      
                    }}
                    className="btn brn-sm"
                    type="submit"
                  >
                    Go
                  </button>
                </form>
        </div>
    )
}
