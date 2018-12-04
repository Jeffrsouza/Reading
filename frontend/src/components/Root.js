import React, { Component } from "react";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";
import "../style/styles.css";
import { Route } from "react-router-dom";

export default class Root extends Component {
  state = {};

  render() {
    return (
      <div className="divBorder">
        <h1>Posts of Reading</h1>
        <Route
          exact
          path="/"
          render={props => (
            <div>
              <div className="divPosts">
                <PostDetails {...props} />
              </div>
            </div>
          )}
        />
        <Route
          path="/newPost"
          render={props => (
            <div>
              <div>
                <NewPost />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
