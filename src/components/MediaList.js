import React, { Component } from "react";
import { MediaCard } from "./MediaCard";
import { AppState, ActionContext } from "../state/state";
const MediaList = ({ mediaList }) => {
  const refAnchor = React.useRef();
  const { state, dispatch } = React.useContext(AppState);
  const { loadPage } = React.useContext(ActionContext);
  const loadMore = () => {
    if (state.isLoading == false) {
      dispatch({ type: "StartLoadMedia" });
      setTimeout(() => {
        loadPage(state.currentPage + 1);
      }, 300);
    }
  };
  React.useEffect(() => {
      loadPage(1);
  }, []);
  React.useEffect(() => {
    if (state.mediaList.length > 0) {
      loadPage(1, true);
    }
  }, [state.sortFilter]);
  const isInViewport = (offset = 0) => {
    if (!refAnchor.current) return false;
    const pos = refAnchor.current.getBoundingClientRect().bottom - 20;
    return pos + offset >= 0 && pos - offset <= window.innerHeight;
  };
  React.useEffect(() => {
    const scrollHandling = (e) => {
      if (isInViewport()) {
        loadMore();
      }
    };
    window.addEventListener("scroll", scrollHandling);
    return () => window.removeEventListener("scroll", scrollHandling);
  }, [loadMore]);
  return (
    <div className="media-card-list">
      {mediaList.map((med) => {
        return <MediaCard key={med.id} media={med}></MediaCard>;
      })}
      <div className="media-card last-anchor" ref={refAnchor}></div>
    </div>
  );
};
export default MediaList;
