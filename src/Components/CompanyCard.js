import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
padding: 10px;
`;

const Logo = styled.img`
width: 100%;
height: 150px;
`;
const Name = styled.div`
margin-top: 15px;
text-align: center;
color: burlywood;
`;

const CompanyCard = ({name, logo_path}) => (
    <Container>
        <Logo src={logo_path}/>
        <Name>{name}</Name>
    </Container>
)

CompanyCard.propTypes = {
    name:PropTypes.string.isRequired,
    logo_path:PropTypes.string
}

export default CompanyCard;