import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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