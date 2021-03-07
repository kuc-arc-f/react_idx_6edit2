
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibCmsEdit from '../../../libs/LibCmsEdit';
//
class Edit extends Component {
  constructor(props) {
      super(props);
      this.state = {title: '', content: ''};
      this.id = 0
      this.handleClick = this.handleClick.bind(this);
      this.handleClickDelete = this.handleClickDelete.bind(this);
      this.db = null
  }
  componentDidMount(){
      this.id  = parseInt(this.props.match.params.id)
      var config = LibCmsEdit.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );         
// console.log( this.id);
      this.get_item( this.id )
  }
  async get_item(id){
    const item = await this.db.pages.get(id);
    this.setState({ 
        title: item.title, 
        content: item.content
    });        
    console.log(item);                          
  }
  update_item(){
    this.db.pages.update(parseInt( this.id ) , {
        title: this.state.title,
        content: this.state.content,
    });
    this.props.history.push("/cms_pages");
//console.log( task )
  }    
  handleClickDelete(){
//        console.log("#-handleClickDelete")
      this.db.pages.delete(parseInt(this.id) );
      this.props.history.push("/cms_pages");
  }
  handleClick(){
      console.log("#-handleClick")
      this.update_item()
//        console.log( this.state )
  }        
  handleChangeTitle(e){
      this.setState({ title: e.target.value })
  }
  handleChangeContent(e){
      this.setState({ content: e.target.value })
  }
  render(){
      return (
      <div className="container">
          <Link to="/cms_pages" className="btn btn-outline-primary mt-2">Back</Link>
          <hr className="mt-2 mb-2" />            
          <h1>Pages - Edit</h1>
          <div className="form-group">
              <label>Title</label>
              <div className="col-sm-6">
                  <input type="text" className="form-control"  value={this.state.title}
                  onChange={this.handleChangeTitle.bind(this)} />
              </div>
          </div>
          <div className="form-group">
              <label>Content:</label>
              <div className="col-sm-10">
                  <textarea className="form-control" value={this.state.content}
                  rows="10"
                  onChange={this.handleChangeContent.bind(this)} ></textarea>
              </div>
          </div>
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
          </div>
          <hr />
          <div className="form-group">
              <button className="btn btn-outline-danger btn-sm mt-2"
              onClick={this.handleClickDelete}>Delete
              </button>
          </div>

      </div>
      )
  }
}
export default Edit;