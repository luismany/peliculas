import React from "react";  
import MovieList from "../componentes/MovieList/MovieList";
import SliderMovies from "../componentes/SliderMovies/SliderMovies";
import UseFetch from "../hooks/useFetch";
import { Api, UrlApi } from '../utils/Constans';
import { Row, Col } from "antd";
import Footer from "../componentes/Footer/Footer";


export default function Home() {

    const newMovies = UseFetch(`
    ${UrlApi}/movie/now_playing?api_key=${Api}&language=en-US&page=1`);
   
    const popularMovies = UseFetch(`
    ${UrlApi}/movie/popular?api_key=${Api}&language=en-US&page=1`);

    const topRatedMovies = UseFetch(`${UrlApi}/movie/top_rated?api_key=${Api}&language=en-US&page=1`);
    return (
        <>
            <SliderMovies movies={newMovies} />
            <Row>
                <Col span={12}>
                    <MovieList title="Peliculas Populares" movies={ popularMovies}/>
                </Col>
                <Col span={12}>
                    <MovieList title="Top Peliculas Mejor Puntuadas" movies={topRatedMovies }/>
                </Col>
            </Row>
           
            <Footer />
        </>
        
    );
}