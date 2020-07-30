import React from 'react';
import TVPresenter from './TVPresenter';

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        error: null,
        loading: true
    };

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