

import '../src/estilos.css';
import React, { useState, Fragment, } from 'react';
import Nav from './componentes/Nav'
import MenuC from './componentes/MenuC'
import PeliculasProvider from './componentes/PeliculasContext'

function App() {

  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState('');
  const [showInfo, setShowInfo] = useState(false)
  const [disabled, setDisabled] = useState(false);


  return (
    <Fragment>
      <Nav setDisabled={setDisabled} disabled={disabled} value={value} setValue={setValue} openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <PeliculasProvider>
        <MenuC setDisabled={setDisabled} showInfo={showInfo} setShowInfo={setShowInfo} value={value} setValue={setValue} openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </PeliculasProvider>
    </Fragment>

  )

}

export default App;
