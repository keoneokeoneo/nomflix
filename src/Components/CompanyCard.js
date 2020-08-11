import React from "react";
import styled from "styled-components";

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

const CompanyCard = ({name, logo_path, origin_country}) => (
    <Container>
        <Logo src={logo_path}/>
        <Name>{`${name} - ${origin_country}`}</Name>
    </Container>
)

export default CompanyCard;