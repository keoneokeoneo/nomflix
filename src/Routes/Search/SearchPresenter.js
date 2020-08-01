import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const SearchPresenter = ({
                             movieResults,
                             tvResults,
                             loading,
                             searchTerm,
                             handleSubmit,
                             error
                         }) => <Container>
    <Form onSubmit={handleSubmit}>
        <Input placeholder = "Search Movies or TV Shows..." value={searchTerm}/>
    </Form>
</Container>;

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default SearchPresenter;