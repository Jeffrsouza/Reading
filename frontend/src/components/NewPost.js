import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/styles.css";
import UUID from "./UUID";
import { callRecordPost, callGetOnePostByEdit, callEditPost } from "../actions";

export class NewPost extends Component {
  state = {
    id: "",
    timestamp: "",
    author: "",
    category: "",
    newPostCat: undefined,
    edit: false
  };

  componentDidMount() {
    const id = new URLSearchParams(window.location.search).get("id");
    id !== null
      ? this.props.callGetOnePostByEdit(id)
      : this.props.callGetOnePostByEdit("");
    this.setState({ edit: id !== null ? true : false });
  }

  async recordPost(id = undefined) {
    const title = document.getElementById("textTitle").value;
    const body = document.getElementById("textBody").value;

    if (id) {
      let post = {
        title: title,
        body: body,
        category: this.state.newPostCat
      };
      this.props.callEditPost(post, id);
    } else {
      const key = UUID();
      let post = {
        id: key,
        timestamp: Date.now(),
        title: title,
        body: body,
        author: this.state.author,
        category: this.state.newPostCat ? this.state.newPostCat : "react"
      };
      this.props.callRecordPost(post);
    }

    window.location.href = "/";
  }

  render() {
    let { edit } = this.state;
    let post =
      this.state.id !== null
        ? this.props.posting.posting
          ? this.props.posting.posting
          : ""
        : "";

    return (
      <div>
        <div className="subNav">
          <div className="textLeft">
            <p className="btnNavBar">Category: </p>
            <select
              className="btnNavBar"
              onChange={evt => this.setState({ newPostCat: evt.target.value })}
              value={
                this.state.newPostCat ? this.state.newPostCat : post.category
              }
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
        {edit ? <p>Edit Post</p> : <p>New Post</p>}
        <input
          type="text"
          placeholder="Author"
          disabled={edit}
          defaultValue={edit ? post.author : ""}
          onChange={evt => this.setState({ author: evt.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Title"
          defaultValue={edit ? post.title : ""}
          id="textTitle"
        />
        <br />
        <input
          type="text"
          placeholder="Post..."
          defaultValue={edit ? post.body : ""}
          id="textBody"
        />
        <br />
        <input
          type="button"
          value="Send"
          onClick={() => this.recordPost(edit && post.id)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ posting }) => ({ posting });

export default connect(
  mapStateToProps,
  { callRecordPost, callGetOnePostByEdit, callEditPost }
)(NewPost);
