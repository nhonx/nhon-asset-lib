import React, { Component } from "react";
import { AppState, ActionContext } from "../state/state";
import { debounce } from "lodash";
const SortFilterPanel = () => {
  const [localState, setState] = React.useState({
    sortBy: "createdAt",
    sortDir: "desc",
    filterBy: "authorName",
    filterValue: "",
  });
  const { state } = React.useContext(AppState);
  const { updateSortFilter } = React.useContext(ActionContext);
  React.useEffect(() => {
    if (
      state.sortBy !== localState.sortBy ||
      state.sortDirection !== localState.sortDir ||
      state.filterValue !== localState.filterValue
    ) {
      debounce(() => {
        updateSortFilter(
          localState.sortBy,
          localState.sortDir,
          localState.filterBy,
          localState.filterValue
        );
      }, 300)();
    }
  }, [localState]);
  const onChanged = (event) => {
    console.log(event.target.name);
    let newState = { ...localState };
    newState[event.target.name] = event.target.value;
    setState(newState);
  };
  return (
    <div className="box filter-sort">
      <div className="field is-grouped">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Sort by</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="sortBy"
                    value={localState.sortBy}
                    onChange={onChanged}
                  >
                    <option value="createdAt">Created at</option>
                    <option value="updateAt">Updated at</option>
                    <option value="size">Size</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="sortDir"
                    value={localState.sortDir}
                    onChange={onChanged}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Filter by</label>
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="filterBy"
                    value={localState.filterBy}
                    onChange={onChanged}
                  >
                    <option value="authorName">Author name</option>
                    <option value="desc">Description</option>
                    <option value="assetType">Asset Type</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control is-expanded">
                <input
                  name="filterValue"
                  className="input"
                  type="text"
                  placeholder="Filter value"
                  value={localState.filterValue}
                  onChange={onChanged}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortFilterPanel;
