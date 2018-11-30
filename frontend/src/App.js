import React, { Component } from "react";
import { addRecipe, removeFromCalendar } from "../src/actions";
import { connect } from "react-redux";

class App extends Component {
  doThing = () => {
    this.props.selectRecipe({});
  };
  render() {
    console.log("props", this.props);
    return (
      <div>
        <div>Hello World</div> <div>Hello World</div>
      </div>
    );
  }
}
function mapStateToProps(calendar) {
  const dayOrder = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? calendar[day][meal] : null;
        return meals;
      }, {})
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: data => dispatch(addRecipe(data)),
    remove: data => dispatch(removeFromCalendar(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
