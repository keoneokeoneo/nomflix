import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
padding: 10px;
`;

const Poster = styled.img`
width: 100%;
height: 150px;
`;

const Description = styled.div`
margin-top: 15px;
text-align: center;
color: burlywood;
`;

const Season = ({name, count, path}) => (
    <Container>
        <Poster src={path}/>
        <Description>{`${name} - ${count}편`}</Description>
    </Container>
)

Season.propTypes = {
    name : PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    path:PropTypes.string.isRequired
}

export default Season;