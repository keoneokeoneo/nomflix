import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { movieAPI } from '../api';
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Section from '../Components/Section'
import Loader from '../Components/Loader'
import Poster from '../Components/Poster'
import Message from '../Components/Message'

const Container = styled.div`
  padding: 20px;
`;

const useFetchData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [popular, setPopular] = useState([]);
    const getData = async () => {
        try {
            const { data: { results: _nowPlaying } } = await movieAPI.nowPlaying();
            const { data: { results: _upComing } } = await movieAPI.upComing();
            const { data: { results: _popular } } = await movieAPI.popular();
            setNowPlaying(_nowPlaying);
            setUpComing(_upComing);
            setPopular(_popular);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
        return () => setLoading(false);
    }, []);

    return { loading, nowPlaying, upComing, popular, error };
}

const Movie = () => {
    const { loading, nowPlaying, upComing, popular, error } = useFetchData();
    return (
        <>
            <Helmet>
                <title>Movies | Nomflix</title>
            </Helmet>
            {
                loading ? (
                    <Loader />
                ) : (
                        <Container>
                            {nowPlaying && nowPlaying.length > 0 && (
                                <Section title="Now Playing">
                                    {nowPlaying.map((movie) => (
                                        <Poster
                                            key={movie.id}
                                            id={movie.id}
                                            imageUrl={movie.poster_path}
                                            title={movie.original_title}
                                            rating={movie.vote_average}
                                            isMovie={true}
                                            year={movie.release_date && movie.release_date.substring(0, 4)}
                                        />
                                    ))}
                                </Section>
                            )}
                            {upComing && upComing.length > 0 && (
                                <Section title="Upcoming Movies">
                                    {upComing.map((movie) => (
                                        <Poster
                                            key={movie.id}
                                            id={movie.id}
                                            imageUrl={movie.poster_path}
                                            title={movie.original_title}
                                            rating={movie.vote_average}
                                            isMovie={true}
                                            year={movie.release_data && movie.release_date.substring(0, 4)}
                                        />
                                    ))}
                                </Section>
                            )}
                            {popular && popular.length > 0 && (
                                <Section title="Popular Movies">
                                    {popular.map((movie) => (
                                        <Poster
                                        key={movie.id}
                                        id={movie.id}
                                        imageUrl={movie.poster_path}
                                        title={movie.original_title}
                                        rating={movie.vote_average}
                                        isMovie={true}
                                        year={movie.release_date && movie.release_date.substring(0, 4)}
                                      />
                                    ))}
                                </Section>
                            )}
                            {error && <Message color="#e74c3c" text={error} />}
                        </Container>
                    )
            }
        </>
    );
}

Movie.propTypes = {
}

export default Movie;