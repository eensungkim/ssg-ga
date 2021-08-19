import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import RecipeList from "../components/RecipeList";
import theme from "../style/theme";

const Container = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  min-height: 770px;

  @media ${(props) => props.theme.minimum} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.1fr 1fr;
    grid-template-areas: "Profile" "User" "Article";
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.1fr 1fr;
    grid-template-areas: "Profile" "User" "Article";
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas: "Profile User" "Article Article";
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 0.1fr 1fr;
    grid-template-areas: "Profile User" "Article Article";
  }
`;

const ProfileBox = styled.div`
  grid-area: Profile;
  display: flex;
  height: 20em;
  flex-direction: column;
  place-self: center;
  justify-content: center;
  align-items: center;
  margin: 2em 5em 2em 5em;
`;
const UserBox = styled.div`
  grid-area: User;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.minimum} {
    align-items: center;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
  }
  @media ${(props) => props.theme.tablet} {
    align-items: flex-start;
  }
  @media ${(props) => props.theme.desktop} {
    align-items: flex-start;
  }
`;
const UsernameBox = styled.div`
  font-size: 1.2em;
  margin: 0em 0em 0.5em 0em;
`;

const Profile = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid #cfd8dc;

  width: 11rem;
  height: 11rem;

  border-radius: 50%;
  overflow: hidden;
`;
const ArticleBox = styled.div`
  grid-area: Article;
`;
const ArticleSelectArea = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 3px solid #cfd8dc;
  text-decoration: underline;
`;

const UserEditBtn = styled.div`
  cursor: pointer;
  border-radius: 10px;
  width: 8em;
  font-size: 1.1em;
  color: white;
  text-decoration: underline;
  color: white;
  &:hover {
    color: #ff71ce;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
  margin: 2.2em 0em 2.2em 0em;
`;

const Btn = styled.span`
  cursor: pointer;
  font-size: 1.2em;
  margin: 0em 0em 0.5em 1.5em;
  text-decoration: underline;
  color: white;
  &:hover {
    color: #ff71ce;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
`;

const ArticleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function MyPage() {
  const state = useSelector((state) => state.userReducer);
  const profile = useSelector((state) => state.profileReducer);

  const { id, username } = state.userData;
  const [query, setQuery] = useState({ published: id });

  const { image } = profile;
  const history = useHistory();

  const handleMyList = (type) => {
    setQuery({ [type]: id });
  };
  return (
    <>
      <Container theme={theme}>
        <ProfileBox>
          <ImageWrap>
            <Profile src={image} />
          </ImageWrap>
        </ProfileBox>
        <UserBox theme={theme}>
          <UsernameBox>{username} 님, 반갑습니다.</UsernameBox>
          <UserEditBtn
            onClick={() => {
              history.push("/useredit");
            }}
          >
            회원정보 수정
          </UserEditBtn>
        </UserBox>

        <ArticleBox>
          <ArticleSelectArea>
            <Btn onClick={() => handleMyList("published")}>내 게시글</Btn>
            <Btn onClick={() => handleMyList("liked")}>내 관심글</Btn>
          </ArticleSelectArea>
          <ArticleArea>
            <RecipeList query={query} />
          </ArticleArea>
        </ArticleBox>
      </Container>
    </>
  );
}
