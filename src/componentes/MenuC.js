import React, { Fragment } from 'react'
import Genero from './Genero'
import Cards from './Cards'
import Buscadas from './Buscadas';
import { Route, Switch, Link, Routes, NavLink } from 'react-router-dom';

const MenuC = ({ value, setValue, openMenu, setOpenMenu, showInfo, setShowInfo, setDisabled, disabled }) => {

    const closePopular = () => {
        setOpenMenu(false);
        setValue('')
        setDisabled(false);
        

    }

    const closeGenre = () => {
        setOpenMenu(false);
        setValue('')
        setDisabled(true);
    }



    return (
        <Fragment>
            <div className={openMenu ? 'menuC active ' : 'menuC'}>
                <NavLink onClick={closePopular} className='menuC__options' to='/'>Popular</NavLink>
                <NavLink onClick={closeGenre} className='menuC__options' to='/genero'>Genero</NavLink>

            </div>

            <Routes>
                <Route path="/" element={value === '' ? <Cards setOpenMenu={setOpenMenu} showInfo={showInfo} setShowInfo={setShowInfo} /> : <Buscadas showInfo={showInfo} setShowInfo={setShowInfo} value={value} setValue={setValue} />} />
                <Route path="/genero" element={<Genero setOpenMenu={setOpenMenu} showInfo={showInfo} setShowInfo={setShowInfo} />} />

            </Routes>
        </Fragment>

    )
}


export default MenuC;