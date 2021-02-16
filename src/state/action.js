import React, { Component } from "react";
import axios from "axios";
import { AppState, ActionContext } from "./state";
import { mockApi } from "../mock-api/mock-api";
const getPageApi = (
  pageNum,
  sortBy,
  sortDirection,
  filterField,
  filterValue
) => {
  let url = `http://localhost:8080/data?pageNum=${pageNum}`;
  if (sortBy || filterField) {
    let sortQuery =
      sortBy && sortDirection ? `&sortBy=${sortBy}_${sortDirection}` : "";
    let filterQuery =
      filterField && filterValue
        ? `&filterBy=${filterField}&filterValue=${filterValue}`
        : "";
    return url + sortQuery + filterQuery;
  }
  return url;
};
export const ActionType = {
  START_LOAD_MEDIA: "StartLoadMedia",
  LOAD_MEDIA_SUCCESSFUL: "LoadMediaSuccessful",
  RELOAD_MEDIA_SUCCESSFUL: "ReloadMediaSuccessful",
  LOAD_MEDIA_FAILED: "LoadMediaFailed",
  UPDATE_SORT_FILTER: "UpdateSortFilter",
};
const AppAction = ({ children }) => {
  let actions = {};
  const { state, dispatch } = React.useContext(AppState);
  const { sortBy, sortDirection, filterBy, filterValue } = state.sortFilter;
  actions.loadPage = (pageNum, forceLoad = false) => {
    dispatch({
      type: ActionType.START_LOAD_MEDIA,
    });
    console.log("load page " + pageNum);
    mockApi(pageNum, sortBy, sortDirection, filterBy, filterValue).then(
      ({ data }) => {
        if (data.code == 0 && data.data.length > 0) {
          if (forceLoad) {
            dispatch({
              type: ActionType.RELOAD_MEDIA_SUCCESSFUL,
              pageNum: 1,
              mediaList: data.data,
            });
          } else {
            dispatch({
              type: ActionType.LOAD_MEDIA_SUCCESSFUL,
              pageNum: pageNum,
              mediaList: data.data,
            });
          }
        } else {
          dispatch({
            type: ActionType.LOAD_MEDIA_FAILED,
            error: {
              msg: "No media found.",
            },
          });
        }
      }
    );
  };
  actions.updateSortFilter = (
    _sortBy,
    _sortDirection,
    _filterBy,
    _filterValue
  ) => {
    dispatch({
      type: ActionType.UPDATE_SORT_FILTER,
      sortBy: _sortBy,
      sortDirection: _sortDirection,
      filterBy: _filterBy,
      filterValue: _filterValue,
    });
  };
  return (
    <ActionContext.Provider value={actions}>{children}</ActionContext.Provider>
  );
};
export default AppAction;
