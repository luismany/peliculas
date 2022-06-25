import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { UrlApi, Api } from "../utils/Constans";
import Footer from "../componentes/Footer/Footer";
import Loading from "../componentes/Loading/Loading";
import MovieCatalog from "../componentes/MovieCatalog/MovieCatalog";
import Pagination from "../componentes/Pagination/PaginationMovie";

export default function Popular() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const respuesta = await fetch(
        `${UrlApi}/movie/popular?api_key=${Api}&lenguage=es-ES&page=${page}`
      );
      const movies = await respuesta.json();
      setMovieList(movies);
    })();
  }, [page]);

  const onChangePage = page => {
    setPage(page);
  };
  
  return (
    
    <Row>
      <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
          Peliculas Populares
        </h1>
      </Col>
      {movieList.results ? (
        <Row>
          <MovieCatalog movies={movieList} />
           <Col span="24">
           
          </Col>
         
          <Col span="24">
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col span="24">
          <Loading />
        </Col>
      )}
        <Col span="24">
        <Footer />
      </Col>
      </Row>
      
  );
}