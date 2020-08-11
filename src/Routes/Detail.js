import React, {useEffect, useState} from "react";
import {movieAPI, tvAPI} from "../api";
import styled from "styled-components";
import Helmet from 'react-helmet'
import Loader from '../Components/Loader'
import YouTube from "react-youtube";
import CompanyCard from "../Components/CompanyCard";
import Season from "../Components/Season";
import Message from "../Components/Message";

const baseImageUrlOriginal = "https://image.tmdb.org/t/p/original";
const baseImageUrlW300 = "https://image.tmdb.org/t/p/w300";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 20px;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
  overflow-y: scroll;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h3`
  font-size: 32px;
  height: 100%;
`;
const IMDB = styled.a`
 margin-left: 25px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 30px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const GridWrapper = styled.div`
display:grid;
    grid-template-columns:repeat(auto-fill, 20%);
    grid-gap:25px;
margin-top: 30px;
`;

const ContentTitle = styled.h2`
font-size: 24px;
font-weight: 200;
`;

const useFetchData = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const getData = async () => {
        const {
            location: {pathname},
            match: {
                params: {id}
            },
            history: {push}
        } = props;
        const isMovie = pathname.includes("/movie/");
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let _data = null;
        try {
            if (isMovie) {
                ({data: _data} = await movieAPI.movieDetail(parsedId));
            } else {
                ({data: _data} = await tvAPI.showDetail(parsedId));
            }
            setResult(_data);
        } catch {
            setError({error: "Can't find anything."});
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();

        return () => setLoading(false);
    }, [])

    return {result, error, loading};
}

const Detail = props => {
    const {result, error, loading} = useFetchData(props);
    return (
        loading ? (
            <>
                <Helmet>
                    <title>Loading | Nomflix</title>
                </Helmet>
                <Loader/>
            </>
        ) : (
            <Container>
                <Helmet>
                    <title>
                        {result.original_title ? result.original_title : result.original_name}{" "}
                        | Nomflix
                    </title>
                </Helmet>
                {error && <Message color="#e74c3c" text={error} />}
                <Backdrop
                    bgImage={`${baseImageUrlOriginal}${result.backdrop_path}`}
                />
                <Content>
                    <Cover
                        bgImage={
                            result.poster_path
                                ? `${baseImageUrlOriginal}${result.poster_path}`
                                : require("../assets/image-not-found.png")
                        }
                    />
                    <Data>
                        <TitleWrapper>
                            <Title>
                                {result.original_title
                                    ? result.original_title
                                    : result.original_name}
                            </Title>
                            {result.imdb_id && (
                                <IMDB href={`https://www.imdb.com/title/${result.imdb_id}`}
                                      target="_blank">
                                    <img alt="IMDB" src={require("../assets/imdb_logo.png")} style={{height: "30px"}}/>
                                </IMDB>
                            )}
                        </TitleWrapper>

                        <ItemContainer>
                            <Item>
                                {result.release_date
                                    ? result.release_date.substring(0, 4)
                                    : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime ? result.runtime : result.episode_run_time[0]} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.production_countries &&
                                result.genres.map((genre, index) =>
                                    index === result.genres.length - 1
                                        ? genre.name
                                        : `${genre.name} / `
                                )}
                            </Item>
                        </ItemContainer>

                        <ItemContainer>
                            <Item>
                                {result.production_countries &&
                                result.production_countries.map((genre, index) =>
                                    index === result.production_countries.length - 1
                                        ? genre.iso_3166_1
                                        : `${genre.iso_3166_1} / `
                                )}
                            </Item>
                        </ItemContainer>

                        <ContentTitle>OverView</ContentTitle>
                        <Overview>{result.overview}</Overview>

                        {result.production_companies && result.production_companies.length > 0 && (<ContentTitle>Production Company</ContentTitle>)}
                        <GridWrapper>
                            {result.production_companies &&
                            result.production_companies.map(company => (
                                <CompanyCard
                                    key={company.id}
                                    name={company.name}
                                    logo_path={`${baseImageUrlW300}${company.logo_path}`}
                                />
                            ))}
                        </GridWrapper>

                        {result.seasons && result.seasons.length > 0 && (
                            <ContentTitle>Episodes</ContentTitle>
                        )}
                        <GridWrapper>
                            {result.seasons &&
                            result.seasons.map((season) => (
                                <Season
                                key={season.id}
                                name={season.name}
                                count={season.episode_count}
                                number={season.season_number}
                                path={`${baseImageUrlW300}${season.poster_path}`}
                                />
                            ))}
                        </GridWrapper>

                        {result.videos.results && result.videos.results.length > 0 && (
                            <ContentTitle>Trailers</ContentTitle>
                        )}
                        <GridWrapper>
                            {result.videos.results &&
                            result.videos.results.map((video, index) => (
                                <YouTube
                                    key={video.id}
                                    videoId={video.key}
                                    opts={{width: '100%', height: 'auto'}}/>
                            ))}
                        </GridWrapper>
                    </Data>
                </Content>
            </Container>
        )
    )
}

export default Detail;