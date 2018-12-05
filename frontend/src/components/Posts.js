import React, { Component } from "react";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  callLoadPosting,
  callDeletePosting,
  callVotePosting,
  callLoadComment,
  callNewComment,
  callLoadCategories,
  callFilterCategories,
  callOrderPosting,
  callEditComment,
  callVoteComment,
  callDeleteComment
} from "../actions";
import UUID from "./UUID";
import Navbar from "./NavBar";

export class Posts extends Component {
  state = {
    openComments: "",
    commentEdit: "",
    order: ""
  };

  handleDeletePosting = id => {
    window.confirm("Delete posting?") && this.props.callDeletePosting(id);
  };

  handleVotingPost = (id, option) => {
    const vote = { option: option };
    this.props.callVotePosting(id, vote, this.state.order);
  };

  handleNewComent = (body, author, id) => {
    const key = UUID();
    let post = {
      id: key,
      timestamp: new Date(),
      body: body,
      author: author,
      parentId: id
    };
    this.props.callNewComment(post);
  };

  hnadleOpenComment = () => {
    this.props.callLoadComment();
  };

  orderPosts = evt => {
    this.setState({ order: evt });
    this.props.callOrderPosting(evt);
  };

  handleEditComment = (id, body) => {
    let post = {
      timestamp: Date.now(),
      body: body
    };
    this.props.callEditComment(id, post);
    this.setState({ commentEdit: "" });
  };

  async handleVotingComment(id, vot) {
    let vote = {
      option: vot
    };
    await this.props.callVoteComment(id, vote);
  }

  formatDate = date => {
    const postDate = new Date(date);
    const year = postDate.getFullYear();
    const month =
      postDate.getMonth() < 10
        ? "0" + (postDate.getMonth() + 1)
        : postDate.getMonth() + 1;
    const day =
      postDate.getDay() < 10 ? "0" + postDate.getDay() : postDate.getDay();
    return year + "/" + month + "/" + day;
  };

  handleDeleteComment = id => {
    this.props.callDeleteComment(id);
  };

  listPost = post => {
    return (
      <div>
        {post !== undefined ? (
          <div key={post.id}>
            <div className="postCard">
              <div className="postTitle">
                <h1>{post.title}</h1>
              </div>
              <div className="postSub">
                <div className="textLeft">
                  <Link
                    to={{
                      pathname: "/" + post.category + "/post_id",
                      search: "?id=" + post.id + "&category=" + post.category
                    }}
                  >
                    <input type="button" value="Details" />
                  </Link>
                </div>
                <div className="textRight">
                  <Link
                    to={{
                      pathname: "/newPost",
                      search: "?id=" + post.id
                    }}
                  >
                    <input type="button" value="Edit" />
                  </Link>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => this.handleDeletePosting(post.id)}
                  />
                </div>
              </div>
              <div className="postSub">
                <div className="textLeft">
                  <p>{"Author: " + post.author}</p>
                  <p>{"Category: " + post.category}</p>
                </div>
                <div className="textRight">
                  <p>{"Date: " + this.formatDate(post.timestamp)}</p>
                </div>
              </div>
              <div className="postBody">
                <h2>{post.body}</h2>
              </div>
              <div className="postFooter">
                <div className="textLeft">
                  <p>
                    {"Score: " + post.voteScore}
                    &nbsp; &nbsp;
                    <input
                      type="button"
                      value="-"
                      onClick={() => this.handleVotingPost(post.id, "downVote")}
                    />
                    <input
                      type="button"
                      value="+"
                      onClick={() => this.handleVotingPost(post.id, "upVote")}
                    />
                  </p>
                </div>
                <div className="textRight">
                  <p>{"Coments: " + post.commentCount}</p>
                </div>
              </div>
              <div className="newComment">
                <div className="textLeft">
                  <input
                    type="text"
                    name={"author" + post.id}
                    placeholder="Author"
                  />
                </div>
                <div className="textLeft">
                  <input
                    type="text"
                    name={"body" + post.id}
                    placeholder="Comment"
                  />
                </div>
                <div className="textRight">
                  <input
                    type="button"
                    value="Post"
                    onClick={() => {
                      this.handleNewComent(
                        document.getElementsByName("body" + post.id)[0].value,
                        document.getElementsByName("author" + post.id)[0].value,
                        post.id
                      );
                      document.getElementsByName("body" + post.id)[0].value =
                        "";
                      document.getElementsByName("author" + post.id)[0].value =
                        "";
                    }}
                  />
                </div>
              </div>
              <div className="postComments">{this.comentsPost(post.id)}</div>
            </div>
            <div className="br" />
          </div>
        ) : (
          <p>Sem dados</p>
        )}
      </div>
    );
  };
  comentsPost = id => {
    let { openComments } = this.state;
    openComments === id && this.props.callLoadComment(id);
    let comments = this.props.comments.comments;
    return openComments === id ? (
      comments !== undefined &&
        comments.length &&
        comments
          .filter(com => com.parentId === id)
          .filter(com => com.deleted === false)
          .map(com => (
            <div key={com.id} className="postComment">
              <div className="postCommentAuthor">
                <div className="textLeft">
                  <p>{"Author: " + com.author}</p>
                </div>
                <div className="textRight">
                  <p>{"Data: " + this.formatDate(com.timestamp)}</p>
                </div>
              </div>
              <div className="balao">
                <p>{com.body}</p>
              </div>
              <div className="postCommentAuthor">
                <div className="textLeft">
                  <p>
                    {"Votes: " + com.voteScore}
                    &nbsp; &nbsp;
                    <input
                      type="button"
                      value="-"
                      onClick={() =>
                        this.handleVotingComment(com.id, "downVote")
                      }
                    />
                    <input
                      type="button"
                      value="+"
                      onClick={() => this.handleVotingComment(com.id, "upVote")}
                    />
                  </p>
                </div>
                <div className="textRight">
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => this.setState({ commentEdit: com.id })}
                  />
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => this.handleDeleteComment(com.id)}
                  />
                </div>
              </div>
              {this.state.commentEdit === com.id && (
                <div className="newComment">
                  <div className="textLeft">
                    <input
                      type="text"
                      name={"body" + com.id}
                      placeholder="Comment"
                      defaultValue={com.body}
                    />
                  </div>
                  <div className="textRight">
                    <input
                      type="button"
                      value="Post"
                      onClick={() => {
                        this.handleEditComment(
                          com.id,
                          document.getElementsByName("body" + com.id)[0].value
                        );
                        document.getElementsByName("body" + com.id)[0].value =
                          "";
                      }}
                    />
                    <input
                      type="button"
                      value="Cancel"
                      onClick={() => this.setState({ commentEdit: "" })}
                    />
                  </div>
                </div>
              )}
              <input
                type="button"
                value="Close"
                onClick={() => this.setState({ openComments: "" })}
              />
            </div>
          ))
    ) : (
      <input
        type="button"
        value="Open Comments"
        onClick={() => this.setState({ openComments: id })}
      />
    );
  };

  async componentDidMount() {}
  render() {
    let category = [];
    let filter = this.props.filter.filter;
    let categories = this.props.categories.categories;
    let posts = this.props.posts.posts;

    return (
      <div>
        <div className="subNav">
          <div className="textLeft">
            <p className="btnNavBar">Order: </p>
            <select
              className="btnNavBar"
              onChange={evt => this.orderPosts(evt.target.value)}
            >
              <option className="btnNavBar" value="voteScore">
                Vote Score
              </option>
              <option className="btnNavBar" value="date">
                Date
              </option>
            </select>
          </div>
          <div className="textRight">
            <Link className="btnNavBar btnNavBarGreen" to="/newPost">
              New Post
            </Link>
          </div>
        </div>
        <div className="divPostsDetails">
          <h1>
            {filter === "all"
              ? "All Categories"
              : filter === undefined
              ? "All Categories"
              : "Category: " + filter}
          </h1>
          {posts !== undefined && posts.length ? (
            posts.map(post => this.listPost(post))
          ) : (
            <h1>Sem dados</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  posts,
  comments,
  categories,
  filter,
  openComments
}) => ({
  posts,
  comments,
  categories,
  filter,
  openComments
});

export default connect(
  mapStateToProps,
  {
    callLoadPosting,
    callDeletePosting,
    callVotePosting,
    callNewComment,
    callLoadComment,
    callLoadCategories,
    callFilterCategories,
    callOrderPosting,
    callEditComment,
    callVoteComment,
    callDeleteComment
  }
)(Posts);
