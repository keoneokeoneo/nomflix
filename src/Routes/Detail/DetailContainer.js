import React from 'react';
import DetailPresenter from './DetailPresenter';
import {movieAPI, tvAPI} from "../../api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location:{pathname}
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: {id}
            },
            history: {push}
        } = this.props;

        const {isMovie} = this.state;
        const parseId = parseInt(id);

        if(isNaN(parseId)){
            return push("/");
        }

        let result = null;

        try {
            if(isMovie){
                const request = await movieAPI.movieById(parseId);
                result = request.data;
            } else {
                const request = await tvAPI.showById(parseId);
                result = request.data;
            }
        } catch {
            this.setState({error: "Can't find anything."});
        } finally {

        }
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter
                result = {result}
                error = {error}
                loading = {loading}
            />
        );
    }
}