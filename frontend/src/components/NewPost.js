import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/styles.css";
import UUID from "./UUID";
import { callRecordPost, callGetOnePostByEdit } from "../actions";

export class NewPost extends Component {
  state = {
    id: "",
    timestamp: "",
    title: "",
    body: "",
    author: "",
    category: "",
    newPostCat: "react"
  };

  componentDidMount() {
    const id = new URLSearchParams(window.location.search).get("id");
    id && this.props.callGetOnePostByEdit(id);
  }
  async recordPost() {
    const key = UUID();

    let post = {
      id: key,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.newPostCat
    };

    this.props.callRecordPost(post);

    window.location.href = "/";
  }

  render() {
    let post = this.props.posting.posting ? this.props.posting.posting : [];

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
        {post.id !== undefined ? <p>Edit Post</p> : <p>New Post</p>}
        <input
          type="text"
          placeholder="Author"
          defaultValue={post.author !== undefined ? post.author : ""}
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
          defaultValue={post.title !== undefined ? post.title : ""}
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
          defaultValue={post.body !== undefined ? post.body : ""}
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

const mapStateToProps = ({ posting }) => ({ posting });

export default connect(
  mapStateToProps,
  { callRecordPost, callGetOnePostByEdit }
)(NewPost);
