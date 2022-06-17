import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import UseFetch from "../../hooks/useFetch";
import { UrlApi, Api } from "../../utils/Constans";
import Loading from "../../componentes/Loading/Loading";
import ModalVideo from "../../componentes/ModalVideo/ModalVideo";
import { PlayCircleOutlined } from '@ant-design/icons';

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
    const { movieInfo: { backdrop_path, poster_path } } = props;
    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    //console.log(props.movieInfo);
    return (
        <div className="movie"
        style={{backgroundImage: `url('${backdropPath}')`}}
        >
            <div className="movie__dark" />
            <Row>
                <Col span={8} offset={3} className="movie__poster">
                    <PosterMovie image={ poster_path} />
                </Col>
                <Col span={10} className="movie__info">
                    <MovieInfo movieInfo={ props.movieInfo} />
                </Col>
            </Row>
            
        </div>
    );
}

function PosterMovie(props) {

    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`;
   
    return <div style={{ backgroundImage: `url('${posterPath}')` }} />; 
}

function MovieInfo(props) {

    const { movieInfo:
        { id, title, release_date, overview, genres } } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const videoMovie = UseFetch(`${UrlApi}/movie/${id}/videos?api_key=${Api}&language=es-ES`);

    const openModal = () => setIsVisibleModal(true);
    const closeModal = () => setIsVisibleModal(false);

    const renderVideo = () => {
        if (videoMovie.result) {
            if ( videoMovie.result.results.length > 0) {
                return (
                    <>
                        <Button icon={<PlayCircleOutlined />} onClick={openModal}>
                            Ver trailer
                        </Button>
                        <ModalVideo
                            videoKey={videoMovie.result.results[0].key}
                            videoPlatform={videoMovie.result.results[0].site}
                            isOpen={isVisibleModal}
                            close={closeModal}
                        />
                    </>
                );
            }
        }
    }
    
    return (
        <>
            <div className="movie__info-header">
                <h1>
                    {title}
                    <span>{moment(release_date, "yyyy-mm-dd").format("yyyy")}</span>
                    
                </h1>
               {renderVideo()} 
            </div>
            <div className="movie__info-content">
                <h3>Informacion General</h3>
                <p>{overview}</p>
                <h3>Generos</h3>
                <ul>
                    {genres.map(gen => (
                        <li key={gen.id}>{gen.name }</li>
                    ))}
                </ul>
            </div>
        </>
    );
}