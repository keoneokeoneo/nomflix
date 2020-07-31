import React from 'react';
import TVPresenter from './TVPresenter';
import { tvAPI } from '../../api';

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const {data: {results: nowPlaying}} = await tvAPI.nowPlaying();
            const {data: {results: popular}} = await tvAPI.popular();
            const {data: {results: airingToday}} = await tvAPI.airingToday();
            this.setState({
                nowPlaying,
                airingToday,
                popular
            });
        } catch {
            this.setState({
                error: "Can't find tv informations."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { topRated, popular, airingToday, error, loading } = this.state;
        return (
            <TVPresenter
                topRated = {topRated}
                airingToday = {airingToday}
                popular = {popular}
                error = {error}
                loading = {loading}
            />
        );
    }
}