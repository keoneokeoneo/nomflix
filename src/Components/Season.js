import React from "react";
import styled from "styled-components";

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

const Season = ({name, count, number, path}) => (
    <Container>
        <Poster src={path}/>
        <Description>{`${name} - ${count}편`}</Description>
    </Container>
)

export default Season;