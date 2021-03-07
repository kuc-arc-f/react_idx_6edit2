import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class IndexRow extends Component {
  render() {
    return (
    <tr>
        <td>
          <h3>{this.props.obj.name}</h3>
            {this.props.obj.created_at} , ID : {this.props.obj.id}              
        </td>
        <td>
            <Link to={`/cms_category_edit/${this.props.obj.id}`}
              className="btn btn-sm btn-outline-primary">Edit
            </Link>                  
        </td>
        <td> 
        </td>
    </tr>
    )
  }
}

export default IndexRow;