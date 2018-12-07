import React, { Component } from "react";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";
import Posts from "./Posts";
import "../style/styles.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./NavBar";
import NotFound from "./NotFound";

export default class Root extends Component {
  render() {
    return (
      <div className="divBorder">
        <h1>Posts of Reading</h1>
        <Switch>
          <Route exact path="/NotFound" component={NotFound} />
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
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <div className="divPosts">
                  <Navbar {...props} />
                  <Posts {...props} />
                </div>
              </div>
            )}
          />
          <Route
            exact
            path="/:category"
            render={props => (
              <div>
                <div className="divPosts">
                  <Navbar {...props} />
                  <Posts {...props} />
                </div>
              </div>
            )}
          />
          <Route
            exact
            path="/:category/:id"
            render={props => (
              <div>
                <div className="divPosts">
                  <PostDetails {...props} />
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}
