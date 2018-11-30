// deve listar todas as categorias disponíveis, que devem se conectar a uma view de categoria para esta categoria
// deve listar todas as postagens ordenadas pelo voteScore (começando pela pontuação mais alta)
// deve ter um controle para modificar o método de ordenação da lista, incluindo, no mínimo, ordenar por voteScore ou ordenar por data de criação
// deve ter um controle para adicionar novas postagens

import React, { Component } from "react";
import NewPost from "./NewPost";
import PostDetails from "./PostDetails";
import "../style/styles.css";
import * as Api from "../utils/api";
import { Link, Route } from "react-router-dom";

export default class Root extends Component {
  state = {
    category: "",
    filter: "all",
    posts: [],
    comments: [],
    order: "voteScore"
  };

  async recordPost(data) {
    await Api.newPost(data);
    alert("Postado");
    this.setState({ title: "", body: "" });
    await this.loadCategories();
  }
  async orderPosts(evt) {
    await this.setState({ order: evt });
    const posts =
      this.state.order === "date"
        ? await this.state.posts.sort(function(a, b) {
            return b.timestamp - a.timestamp;
          })
        : await this.state.posts.sort(function(a, b) {
            return b.voteScore - a.voteScore;
          });
    await this.setState({ posts });
  }
  async orderComments(evt) {
    const comments = await this.state.comments.sort(function(a, b) {
      return b.voteScore - a.voteScore;
    });
    await this.setState({ comments });
  }
  async filterCategory(evt) {
    await this.setState({ filter: evt });
    await this.loadCategories();
    await this.loadPosts();
  }

  async loadCategories() {
    await Api.getAllCat().then(cat => this.setState({ category: cat }));
  }

  async votingComment(id, oper) {
    let vote = { option: oper };
    await Api.voteComment(id, vote).then(response => console.log(response));
    this.loadPosts();
  }
  async deleteComment(id) {
    await Api.deleteComment(id).then(response => console.log(response));
    this.loadPosts();
  }

  async editComment(body, id) {
    let post = {
      timestamp: new Date(),
      body: body
    };
    await Api.editComment(id, post).then(response => console.log(response));
    this.loadPosts();
  }

  componentDidMount() {
    //  this.loadCategories();
    //  this.loadPosts();
  }

  navBar = cat => {
    return (
      <input
        key={cat.name}
        className={
          this.state.filter === cat.name ? "btnNavBar btnSelected" : "btnNavBar"
        }
        type="button"
        value={cat.name}
        onClick={evt => this.filterCategory(evt.target.value)}
      />
    );
  };

  render() {
    let { category, filter, posts, comments } = this.state;
    return (
      <div className="divBorder">
        <h1>Posts of Reading</h1>
        <Route
          exact
          path="/"
          render={props => (
            <div>
              <div className="divPosts">
                <PostDetails
                  {...props}
                  comments={comments}
                  _handleDeleteComment={id => this.deleteComment(id)}
                  _handleEditComent={(body, id) => this.editComment(body, id)}
                  _handleVotingComment={(id, oper) =>
                    this.votingComment(id, oper)
                  }
                />
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/newPost"
          render={props => (
            <div>
              <div>
                <NewPost
                  {...props}
                  _handleRecordPost={evt => this.recordPost(evt)}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
