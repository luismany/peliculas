import React from "react";
import { Row, Col, Botton } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import UseFetch from "../../hooks/useFetch";
import { UrlApi, Api } from "../../utils/Constans";
import Loading from "../../componentes/Loading/Loading";

import "./Movie.scss";

export default function Movie() {

    const { id } = useParams();
    /*const params = useParams();
    console.log(params);*/
    const movieInfo = UseFetch(`${UrlApi}/movie/${id}?api_key=${Api}&language=es-Es`);
    
    //console.log(movieInfo);
    if (movieInfo.loading || !movieInfo.result)
        return <Loading />;
    
    return <RenderMovie movieInfo={ movieInfo.result} />;
}

function RenderMovie(props) {
    const { movieInfo: { title, backdrop_path } } = props;
    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    console.log(props.movieInfo);
    return (
        <div className="movie"
        style={{backgroundImage: `url('${backdropPath}')`}}
        >
            <div className="movie__dark" />
            <Row>
                <Col span={8} offset={3} className="movie__poster">
                    Caratula ...
                </Col>
                <Col span={10} className="movie__info">
                    MovieInfo ...
                </Col>
            </Row>
            
        </div>
    );
}