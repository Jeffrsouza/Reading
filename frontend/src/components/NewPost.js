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
    title: "",
    body: "",
    author: "",
    category: "",
    newPostCat: "react",
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
    const key = UUID();
    if (id) {
      let post = {
        title: this.state.title,
        body: this.state.body
      };
      this.props.callEditPost(post, id);
    } else {
      let post = {
        id: key,
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.newPostCat
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
              defaultValue={edit && post.category}
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
        />
        <br />
        <input
          type="text"
          placeholder="Title"
          defaultValue={edit ? post.title : ""}
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
          defaultValue={edit ? post.body : ""}
          onChange={evt =>
            this.setState({
              body: evt.target.value
            })
          }
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
