import React from 'react';
import SearchPresenter from './SearchPresenter';
import { movieAPI, tvAPI } from '../../api';

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    };

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.searchByTerm(searchTerm);
        }
    }

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const {results: movieResults} = await movieAPI.search(searchTerm);
            const {results: tvResults} = await tvAPI.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            })
        } catch {
            this.setState({error: "Can't find results."});
        } finally {
            this.setState({loading: false});
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        return (
            <SearchPresenter
                movieResults = {movieResults}
                tvResults = {tvResults}
                searchTerm = {searchTerm}
                error = {error}
                loading = {loading}
                handleSubmit = {this.handleSubmit}
            />
        );
    }
}