
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import marked from  'marked'
import LibCmsEdit from '../../../libs/LibCmsEdit';
import LibCommon from '../../../libs/LibCommon';

import '../../../css/TodoShow.css';
//
class Show extends Component {
  constructor(props) {
      super(props);
//        this.state = {title: '', content: ''};
      this.state = {
          title: '', content: '',
          type :0 , created_at: '',
      };
      this.id = 0
      this.handleClick = this.handleClick.bind(this);
      this.db = null
  }
  componentDidMount(){
      this.id  = parseInt(this.props.match.params.id)
      var config = LibCmsEdit.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );         
//console.log( this.id);
      this.get_item( this.id )
  }
  async get_item(id){
      var item = await this.db.pages.get(id);
      item.content = marked(item.content)
      item.created_at = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')
      this.setState({ 
          title: item.title, 
          content: item.content,
          type: item.complete,
          created_at: item.created_at,
      });        
      console.log(item);                          
  }
  handleClick(){
      console.log("#-handleClick")
//        console.log( this.state )
  }        
  render(){
      return (
      <div className="container">
          <Link to="/cms_edit" className="btn btn-outline-primary mt-2">Back</Link>
          <hr className="mt-2 mb-2" />            
          <h1>{this.state.title}</h1>
          Date : {this.state.created_at}
          <hr />
          <div id="post_item" 
          dangerouslySetInnerHTML={{ __html: this.state.content }}></div>

      </div>
      )
  }
}
export default Show;