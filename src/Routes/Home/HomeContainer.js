import React from 'react';
import HomePresenter from './HomePresenter';

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error: null,
        loading: true
    };

    render() {
        const { nowPlaying, upComing, popular, error, loading } = this.state;
        return (
            <HomePresenter
                upComing = {upComing}
                nowPlaying = {nowPlaying}
                popular = {popular}
                error = {error}
                loading = {loading}
            />
        );
    }
}