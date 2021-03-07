import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class IndexRow extends Component {
  render() {
    return (
    <tr>
        <td>
            <Link to={`/cms_edit_show/${this.props.obj.id}`} >
                  <h3>{this.props.obj.title}</h3>
            </Link>    
            {this.props.obj.created_at} , ID : {this.props.obj.id} 
            , Category : {this.props.obj.category.name}              
        </td>
        <td>
            <Link to={`/cms_edit_edit/${this.props.obj.id}`}
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