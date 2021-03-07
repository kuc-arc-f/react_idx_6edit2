
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibCmsEdit from '../../libs/LibCmsEdit';
import LibBook from '../../libs/LibBook';
//
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', content: '', category : {} ,category_items:[] 
    };
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
    const item = await this.db.posts.get(id);
    var category_items = await this.db.category.toArray();
    var category= LibBook.get_category_item(item.category_id , category_items)        
    this.setState({ 
      title: item.title, 
      content: item.content,
      category: category,
      category_items: category_items,
    }); 
//console.log(item.category_id);
    var elemDate = document.getElementById('category_id');
    elemDate.value= item.category_id                        
  }
  update_item(){
    var elem = document.getElementById('category_id');
    var category_id = elem.value                      
    this.db.posts.update(parseInt( this.id ) , {
      title: this.state.title,
      content: this.state.content,
      category_id: category_id,
    });
    this.props.history.push("/cms_edit");
//console.log( task )
  }    
  handleClickDelete(){
//        console.log("#-handleClickDelete")
    this.db.posts.delete(parseInt(this.id) );
    this.props.history.push("/cms_edit");
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
  tabCategory(){
    var category = this.state.category_items 
    return (
      <div>
        <hr />
        <label>Category :</label>
        <select id="category_id" name="category_id" className="form-control">
          <option value="0">Select please</option>
          {category.map((item, index) => {
// console.log(item)
            return(<option key={index}
              value={item.save_id}>{item.name}</option>)            
          })}          
        </select>          
      </div>
    )
  }   
  render(){
//var category = this.state.category 
//console.log(category)
    return (
    <div className="container">
      <Link to="/cms_edit" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />            
      <h1>Posts - Edit</h1>
      {this.tabCategory()}
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
