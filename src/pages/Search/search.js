import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import history from "history/browser";
import queryString from 'query-string';
import MovieCatalog from '../../componentes/MovieCatalog/MovieCatalog';
import Footer from '../../componentes/Footer/Footer';
import { UrlApi, Api } from '../../utils/Constans';


import './Search.scss';

export default function Search() {
    
    const [listaMovies, setListaMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {

        (async () => {
            
            const searchValue = queryString.parseUrl(history.location.search);
            const { s } = searchValue.query;

            if(s){
            const respuesta = await fetch(
                `${UrlApi}/search/movie?api_key=${Api}&language=es-ES&query=${s}&page=1`
                );
                
            const movies = await respuesta.json();
            setListaMovies(movies);
                setSearchValue(s);
                
            //console.log(movies);
        }
            
        })();
        
    },[history.location.search]);

    const onChangeSearch = (e) => {
        //se obtienen los parametros de la url
        const urlParam = queryString.parse(history.location.search);
        //se actualizan los parametros de la url
        urlParam.s = e.target.value;
        //se refresca la url
        history.push(`?${queryString.stringify(urlParam)}`);
        //y se actualiza el estado del valor del buscador
        setSearchValue(e.target.value);
        //console.log(urlParam);
        //console.log(e.target.value);
    };
    
    return (

        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Busca tu pelicula</h1>
                <Input value={searchValue} onChange={onChangeSearch} />
            </Col>
            {listaMovies.results &&(
                <Row>
                    <MovieCatalog movies={listaMovies } />
                
                </Row>
            )}
            <Col span={24}>
                <Footer />
            </Col>
        </Row>
    );
}


