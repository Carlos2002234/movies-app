import React, { useEffect, useContext, useState, Fragment } from 'react'
import { peliculasContext } from './PeliculasContext';

const Genero = ({ showInfo, setShowInfo,setOpenMenu }) => {
    const { apiKey, genero, setGenero, generoSelected, setGeneroSelected } = useContext(peliculasContext);

    const [currentData, setCurrentData] = useState([])
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    const [currentPage, setCurrentPage] = useState(1);//starts at page 1
    const [data, setData] = useState([]);


  

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    const url2 = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate&with_genres=${generoSelected}`;

    const generoApi = async () => {
        try {
            const result = await fetch(url)
            const data = await result.json()
            //get de id
            setGenero(data.genres)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        generoApi();
        generoPelis();
        console.log(url2)
    }, [generoSelected, currentPage])



    const generoPelis = async () => {
        try {
            const result = await fetch(url2)
            const data = await result.json()
            setData(data.results);
            //console.log(data)

        } catch (error) {
            console.error(error)
        }
    }


    const info = (el) => {
        setShowInfo(true);
        setCurrentData(el)

        //close menu
        setOpenMenu(false);
    }


    const before = () => {

        if (currentPage <= 1) {
            return setCurrentPage(1)
        }

        setCurrentPage(currentPage - 1)
    }


    const close = (e) => {
        e.preventDefault();
        setShowInfo(false)
    }


    const trailer = () => {
        window.open(`https://www.youtube.com/results?search_query=${currentData.title}+trailer`); //This will open Google in a new window.
        //console.log(`data actual ${currentData.title}`)
    }

    return (
        <Fragment>
            <div className='containerGeneros'>
                {genero.map((el) =>
                    <button key={el.name} onClick={() => setGeneroSelected(el.id)} className='botoneGenero'>{el.name}</button>
                )}
            </div>

            <div className='cardsGrid'>
                {data.map((el, index) => <div key={index} className='card'>
                    <img onClick={() => info(el)} className='card__img' src={imgUrl + el.poster_path} alt=''></img>
                    <h2 className='card__title'>{el.title}</h2>
                    <h4 className='card__popularity'>{el.popularity}</h4>
                </div>)}
            </div>



            <div className={showInfo ? 'containerP' : 'none'}>
                <div className='infoC'>
                    <img className='infoC__img' src={imgUrl + currentData.poster_path} alt='error'></img>
                    <section>
                        <h2 className='infoC__title'>{currentData.title}</h2>
                        <h2 className='infoC__date'>{currentData.release_date}</h2>
                        <p className='infoC__description'>{currentData.overview}</p>
                        <button className='infoC__trailer' onClick={trailer}>Ver trailer</button>
                    </section>
                </div>

                <a onClick={close} href='x' className='btnClose'>X</a>
            </div>

            <div className='containerBtns'>
                <button onClick={() => setCurrentPage(currentPage + 1)} className='btnNext'>
                    <i className="fas fa-arrow-circle-right"></i>
                </button>
                <button onClick={before} className='btnNext'>
                    <i className="fas fa-arrow-circle-left"></i>
                </button>
            </div>

        </Fragment>

    )
}

export default Genero;
