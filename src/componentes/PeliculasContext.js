
import React, { createContext, useState } from 'react';

export const peliculasContext = createContext('default');


const PeliculasContext = ({ children }) => {

    const apiKey = '44f5a0b7850c153dc414791e61c78ffe';
    const [dataP, setDataP] = useState([]);
    const [dataBuscadas, setDataBuscadas] = useState([]);
    const [genero, setGenero] = useState([]);
    const [generoSelected, setGeneroSelected] = useState();


    return (
        <peliculasContext.Provider value={{
            dataP, setDataP, apiKey, dataBuscadas, setDataBuscadas, genero, setGenero,
            generoSelected,setGeneroSelected
        }}>
            {children}
        </peliculasContext.Provider>
    )
}


export default PeliculasContext;