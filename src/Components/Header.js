import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
color: white;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 70px;
display: flex;
align-items: center;
background-color: rgba(20, 20, 20, 0.8);
z-index: 10;
box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
padding: 0px 20px;
`;
const HeaderList = styled.ul`
display: flex;
`;
const HeaderListItem = styled.li`
width: 80px;
height: 70px;
text-align: center;
border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  :not(:last-child){
  margin-right: 12px;
  }
`;
const HeaderListItemLink = styled(Link)`
height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
export default withRouter(({ location: { pathname } }) => (
    <Header>
        <HeaderList>
            <HeaderListItem current={pathname === "/"}>
                <HeaderListItemLink to="/">Home</HeaderListItemLink>
            </HeaderListItem>

            <HeaderListItem current={pathname === "/tv"}>
                <HeaderListItemLink to="/tv">TV</HeaderListItemLink>
            </HeaderListItem>

            <HeaderListItem current={pathname === "/search"}>
                <HeaderListItemLink to="/search">Search</HeaderListItemLink>
            </HeaderListItem>

        </HeaderList>
    </Header>
));