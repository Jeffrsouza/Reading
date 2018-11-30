import React, { Component } from "react";
import * as Api from "../utils/api";
import { Link } from "react-router-dom";
import "../style/styles.css";

export default class NewPost extends Component {
  //virou entity
  state = {
    id: "",
    timestamp: "",
    title: "",
    body: "",
    author: "",
    category: "",
    voteScore: "",
    deleted: "",
    commentCount: "",
    idEditPost: "",
    newPostCat: "react"
  };

  async loadPostById(id) {
    const post = await Api.getPostById(id).then(response => response);
    typeof post !== "undefined" &&
      this.setState({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        voteScore: post.voteScore,
        deleted: post.deleted,
        commentCount: post.commentCount
      });
  }
  async componentDidMount() {
    const id = new URLSearchParams(window.location.search).get("id"); // bar
    this.setState({ idEditPost: id });
    id && (await this.loadPostById(id));
  }
  async recordPost() {
    let date = new Date();

    let post = {
      id:
        this.state.author +
        date.getFullYear() +
        "" +
        date.getMonth() +
        "" +
        date.getDay(),
      timestamp: date.getFullYear() + "" + date.getMonth() + "" + date.getDay(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.props.newPostCat
    };

    this.props._handleRecordPost(post);
    this.setState({ title: "", body: "" });
  }

  render() {
    return (
      <div>
        <div className="subNav">
          <div className="textLeft">
            <p className="btnNavBar">Category: </p>
            <select
              className="btnNavBar"
              onChange={evt => this.setState({ newPostCat: evt.target.value })}
              defaultValue={this.state.newPostCat}
            >
              <option className="btnNavBar" value="react">
                react
              </option>
              <option className="btnNavBar" value="redux">
                redux
              </option>
              <option className="btnNavBar" value="udacity">
                udacity
              </option>
            </select>
          </div>
          <div className="textRight">
            <Link className="btnNavBar btnNavBarGreen" to="/">
              Posts
            </Link>
          </div>
        </div>
        {this.state.idEditPost ? <p>Edit Post</p> : <p>New Post</p>}
        <input
          type="text"
          placeholder="Author"
          value={this.state.author}
          onChange={evt =>
            this.setState({
              author: evt.target.value
            })
          }
        />
        <br />
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={evt =>
            this.setState({
              title: evt.target.value
            })
          }
        />
        <br />
        <input
          type="text"
          placeholder="Post..."
          value={this.state.body}
          onChange={evt =>
            this.setState({
              body: evt.target.value
            })
          }
        />
        <br />
        <input type="button" value="Send" onClick={() => this.recordPost()} />
      </div>
    );
  }
}
