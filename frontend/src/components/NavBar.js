import React, { Component } from "react";
import "../style/styles.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  callFilterCategories,
  callLoadCategories,
  callLoadPosting,
  callLoadPostingByCat
} from "../actions";

export class NavBar extends Component {
  state = {
    fil: "all"
  };
  componentDidMount() {
    this.props.callLoadPosting();
    this.props.callLoadCategories();
    const filter = window.location.pathname.replace("/", "");
    filter && this.props.callFilterCategories(filter);
    filter && this.setState({ fil: filter });
    filter && filter !== "all" && this.props.callLoadPostingByCat(filter);
  }

  handleFilter = filter => {
    window.location = "/" + filter;
  };

  orderPosts = evt => {
    this.setState({ order: evt });
    this.props.callOrderPosting(evt);
  };

  render() {
    let categories = this.props.categories.categories;
    let { fil } = this.state;
    return (
      <div className="navBar">
        <div className="navBarInter">
          <Link
            to={"#"}
            className={
              categories && fil === "all"
                ? "btnNavBar btnSelected"
                : "btnNavBar"
            }
            onClick={() => this.handleFilter("all")}
          >
            all
          </Link>
          {categories &&
            categories.map(cat => (
              <Link
                to={"#"}
                onClick={() => this.handleFilter(cat.name)}
                className={
                  fil === cat.name ? "btnNavBar btnSelected" : "btnNavBar"
                }
              >
                {cat.name}
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filter, categories, posts }) => ({
  filter,
  categories,
  posts
});

export default connect(
  mapStateToProps,
  {
    callFilterCategories,
    callLoadCategories,
    callLoadPosting,
    callLoadPostingByCat
  }
)(NavBar);
