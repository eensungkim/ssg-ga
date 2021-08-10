import logo from "./logo.svg";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import RecipeWrite from "./pages/RecipeWrite";
import RecipeView from "./pages/RecipeView";
import MyPage from "./pages/MyPage";
import UserEdit from "./pages/UserEdit";
import ModalContainer from "./components/ModalContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components";
import theme from "./style/theme";

const AppContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    //  반응형 theme.js 활용
    @media ${(props) => props.theme.minimum} {
      width: 100%;
    }
    @media ${(props) => props.theme.mobile} {
      width: 480px;
    }
    @media ${(props) => props.theme.tablet} {
      width: 750px;
    }
    @media ${(props) => props.theme.desktop} {
      width: 1200px;
    }
  }
`;

function App() {
  // isLogin Redux 상태관리
  // 현재 로그인한 유저 정보
  const state = useSelector((state) => state.userReducer);
  // const { isLogin } = state;

  return (
    <AppContainer theme={theme}>
      <ModalContainer />
      <Header />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/main:option?">
          <Main />
        </Route>

        <Route path="/write/:id?">
          <RecipeWrite />
        </Route>

        <Route path="/view/:id">
          <RecipeView />
        </Route>
        {/* ~~~~~/:게시물 id */}

        <Route path="/mypage">
          <MyPage />
        </Route>

        <Route path="/useredit">
          <UserEdit />
        </Route>
      </Switch>
      <Footer />
    </AppContainer>
  );
}

export default App;
