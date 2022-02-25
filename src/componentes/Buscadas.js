import React, { useEffect, useState, useContext, Fragment } from 'react'
import { peliculasContext } from './PeliculasContext';

const Buscadas = ({ showInfo, setShowInfo, value }) => {
    const [currentPage, setCurrentPage] = useState(1);//starts at page 1
    const [currentData, setCurrentData] = useState('');
    //context
    const { apiKey, dataBuscadas, setDataBuscadas } = useContext(peliculasContext);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${currentPage}&include_adult=false&query=${value}`;
    const imgUrl = 'https://image.tmdb.org/t/p/w500';
    //llamado de api buscadas

    const BuscadasApi = async () => {
      
        try {
            const result = await fetch(url);
            const data = await result.json();

            setDataBuscadas(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    const close = (e) => {
        e.preventDefault();
        setShowInfo(false)
    }

    useEffect(() => {
        BuscadasApi();
    }, [value, currentPage])

    const info = (el) => {
        setShowInfo(true);
        setCurrentData(el);
    }



    const before = () => {

        if (currentPage <= 1) {
            return setCurrentPage(1)
        }

        setCurrentPage(currentPage - 1)
    }

    const trailer = () => {
        window.open(`https://www.youtube.com/results?search_query=${currentData.title}+trailer`); //This will open Google in a new window.
        //console.log(`data actual ${currentData.title}`)
    }


    return (
        <Fragment>
            <div className='cardsGrid'>
                {dataBuscadas.map((el, index) => <div key={index} className='card'>
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


export default Buscadas;

