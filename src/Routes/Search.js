import React, {useState} from "react";
import styled from "styled-components";
import Helmet from "react-helmet"
import Loader from '../Components/Loader'
import Section from '../Components/Section'
import Message from '../Components/Message'
import Poster from '../Components/Poster'
import {movieAPI, tvAPI} from "../api";

const Container = styled.div`
    padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState("");
    const [error, setError] = useState(null);
    const [data, setData] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        if(term !== "") {
            searchByTerm().then();
        }
    }
    const updateTerm = e => setTerm(e.target.value);

    const searchByTerm = async () => {
        setLoading(true);
        let result = {};
        try {
            const {
                data: { results: movieResults }
            } = await movieAPI.search(term);
            result.movieResults = movieResults;
            const {
                data: { results: tvResults }
            } = await tvAPI.search(term);
            result.tvResults = tvResults;
            setData(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {term, handleSubmit, updateTerm, loading, data, error}
}

const Search = () => {
    const search = useSearch();
    return (
        <Container>
            <Helmet>
                <title>Search | Nomflix</title>
            </Helmet>
            <Form onSubmit={search.handleSubmit}>
                <Input
                    placeholder="Movie, TV, Actors.."
                    value={search.term}
                    onChange={search.updateTerm}
                />
            </Form>
            {search.loading ? (
                <Loader />
            ) : (
                <>
                    {search.data.movieResults && search.data.movieResults.length > 0 && (
                        <Section title="Movie Results">
                            {search.data.movieResults.map((movie) => (
                                <Poster
                                    key={movie.id}
                                    id={movie.id}
                                    imageUrl={movie.poster_path}
                                    title={movie.original_title}
                                    rating={movie.vote_average}
                                    isMovie={true}
                                    year={movie.release_date && movie.release_date.substring(0,4)}
                                />
                            ))}
                        </Section>
                    )}
                    {search.data.tvResults && search.data.tvResults.length > 0 && (
                        <Section title="TV Show Results">
                            {search.data.tvResults.map((show) => (
                                <Poster
                                    key={show.id}
                                    id={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={show.first_air_date && show.first_air_date.substring(0,4)}
                                />
                            ))}
                        </Section>
                    )}
                    {search.error && <Message color="#e74c3c" text={search.error} />}
                    {search.data.tvResults &&
                    search.data.movieResults &&
                    search.data.tvResults.length === 0 &&
                    search.data.movieResults.length === 0 && (
                        <Message text="Nothing found" color="#95a5a6" />
                    )}
                </>
            )}
        </Container>
    )
}

export default Search;