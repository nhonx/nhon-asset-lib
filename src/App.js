import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import AppAction from "./state/action";
import AppReducer from "./state/reducer";
import { AppState } from "./state/state";
import MediaList from "./components/MediaList";
import SortFilterPanel from "./components/SortFilter";
import Header from "./components/Header";
const INIT_STATE = {
  mediaList: [],
  isLoading: true,
  currentPage: 0,
  error: null,
  sortFilter: {
    sortBy: "createdAt",
    sortDirection: "desc",
    filterBy: "authorName",
    filterValue: "",
  },
};
const App = () => {
  const [state, dispatch] = React.useReducer(AppReducer, INIT_STATE);
  console.log(state);
  return (
    <AppState.Provider value={{ state, dispatch }}>
      <AppAction>
        <Header></Header>
        <div className="container media-container">
          <SortFilterPanel></SortFilterPanel>
          <MediaList mediaList={state.mediaList}></MediaList>
          <div className={"loading " + (state.isLoading ? "" : "is-hidden")}>
            <img src="https://miro.medium.com/max/1600/0*ptDX0HfJCYpo9Pcs.gif"></img>
          </div>
        </div>
      </AppAction>
    </AppState.Provider>
  );
};

export default App;
