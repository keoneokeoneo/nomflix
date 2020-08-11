import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
    :not(:last-child){
        margin-bottom:50px;
     }
`;
const TitleWrapper = styled.div`
     display:flex;
`;
const Title = styled.span`
    font-size:24px;
    font-weight:600;
`;
const Explore = styled.div`
     margin-left:40px;
     background-color : white;
     color:black;
     border:1px solid black;
     border-radius:4px;
`;
const Grid = styled.div`
    margin-top:25px;
    display:grid;
    grid-template-columns:repeat(auto-fill, 125px);
    grid-gap:25px;
`;

const Section = ({ title, children }) => (
    <Container>
        <TitleWrapper>
            <Title>{title}</Title>
            <Explore>
                <Link>View More</Link>
            </Explore>
        </TitleWrapper>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Section;