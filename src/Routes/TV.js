import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { tvAPI } from '../api';
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
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const getData = async () => {
        try {
            const {
                data: { results: topRated }
            } = await tvAPI.topRated();
            const {
                data: { results: popular }
            } = await tvAPI.popular();
            const {
                data: { results: airingToday }
            } = await tvAPI.airingToday();
            setTopRated(topRated);
            setAiringToday(airingToday);
            setPopular(popular);
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

    return { topRated, popular, airingToday, loading, error };
}

const TV = () => {
    const { topRated, popular, airingToday, loading, error } = useFetchData();
    return (
        <>
            <Helmet>
                <title>TV Shows | Nomflix</title>
            </Helmet>
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    {topRated && topRated.length > 0 && (
                        <Section title="Top Rated TV Shows">
                            {topRated.map((show) => (
                                <Poster
                                    key={show.id}
                                    id={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={
                                        show.first_air_date && show.first_air_date.substring(0, 4)
                                    }
                                />
                            ))}
                        </Section>
                    )}
                    {popular && popular.length > 0 && (
                        <Section title="Popular TV Shows">
                            {popular.map((show) => (
                                <Poster
                                    key={show.id}
                                    id={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={
                                        show.first_air_date && show.first_air_date.substring(0, 4)
                                    }
                                />
                            ))}
                        </Section>
                    )}
                    {airingToday && airingToday.length > 0 && (
                        <Section title="Airing Today TV Shows">
                            {airingToday.map((show) => (
                                <Poster
                                    key={show.id}
                                    id={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={
                                        show.first_air_date && show.first_air_date.substring(0, 4)
                                    }
                                />
                            ))}
                        </Section>
                    )}
                    {error && <Message color="#e74c3c" text={error} />}
                </Container>
            )}
        </>
    );
}

TV.propTypes = {
}

export default TV;