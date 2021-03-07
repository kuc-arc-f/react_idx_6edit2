import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

//
class TableRow extends Component {
  render() {
    return (
      <p>
        {this.props.obj.id} , 
        {this.props.obj.title}
      </p>
    )
  }
}

export default TableRow;

