import React, { useContext, useEffect, useState, Fragment } from 'react'
import { peliculasContext } from './PeliculasContext';


const Cards = ({ showInfo, setShowInfo, setOpenMenu }) => {
    const { apiKey, setDataP, dataP } = useContext(peliculasContext);
    const [currentData, setCurrentData] = useState('');
    const [currentPage, setCurrentPage] = useState(1);//starts at page 1
    //const [pageBefore, setBeforePage] = useState(1);

    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    const imgUrl = 'https://image.tmdb.org/t/p/w500';


    const popularesApi = async () => {
        try {
            const result = await fetch(url)
            const data = await result.json();
            setDataP(data.results)
            //console.log(data.results)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        popularesApi();
    }, [currentPage]) //everytime currenPage changes 

    //set info

    const info = (el) => {
        setShowInfo(true);
        setCurrentData(el)
        //close menu
        setOpenMenu(false)
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


    //console.log(currentPage)
    return (
        <Fragment>
            <div className='cardsGrid'>
                {dataP.map((el, index) => <div key={index} className='card'>
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

export default Cards



