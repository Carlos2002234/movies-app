import React from 'react'

const Nav = ({ setValue, openMenu, setOpenMenu, value, disabled, setDisabled }) => {

    console.log(`disabled => ${disabled}`)
    return (
        <nav className='nav'>
            <h1 className='nav__title'>Movie<span>APP</span></h1>
            <input disabled={disabled === true ? true : false} value={value} onChange={(e) => setValue(e.target.value)} className='nav__input' name='peliculaI' placeholder='search for a movie'></input>
            <i onClick={() => setOpenMenu(!openMenu)} className="fas fa-bars nav__icon"></i>
        </nav>
    )
}

export default Nav;