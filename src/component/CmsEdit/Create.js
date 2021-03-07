
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibCmsEdit from '../../libs/LibCmsEdit';
import LibCommon from '../../libs/LibCommon';

//
class Create extends Component {
  constructor(props){
      super(props)
      this.state = {title: '', content: '', category_items: [] }
      this.handleClick = this.handleClick.bind(this);
      this.db = null
  }
  componentDidMount(){
      var config = LibCmsEdit.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );  
      this.get_category_items()               
  }
  handleChangeTitle(e){
      this.setState({title: e.target.value})
  }
  handleChangeContent(e){
      this.setState({content: e.target.value})
  }
  get_category_items(){
    var self = this
    this.db.category.toArray().then(function (items ) {
        self.setState({ category_items: items })
console.log( items )
    });        
  }
  add_item(){
    var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
    var elem = document.getElementById('category_id');
    var task = {
      save_id : dt,
      title: this.state.title,
      category_id: elem.value,
      content: this.state.content,
      created_at: new Date(),
    }
// console.log( task )
    this.db.posts.add( task)
    this.props.history.push("/cms_edit");
  }
  handleClick(){
      console.log("#-handleClick")
      this.add_item()
//        console.log( this.state )
  }
  tabCategory(){
    var category = this.state.category_items 
//console.log(category)
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
  render() {
    return (
    <div className="container">
      <Link to="/cms_edit" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h1 className="mt-2">CmsEdit - Create</h1>
      {this.tabCategory()}
      <hr />
      <div className="form-group">
          <label>Title:</label>
          <div className="col-sm-6">
              <input type="text" className="form-control"
                      onChange={this.handleChangeTitle.bind(this)}/>                    
          </div>
      </div>
      <div className="form-group">
          <label>Content:</label>
          <div className="col-sm-10">
              <textarea type="text" className="form-control" rows="10"
              onChange={this.handleChangeContent.bind(this)} ></textarea>
          </div>
      </div>
      <br />
      <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Create
          </button>
      </div>
    </div>
    )
  }
}
export default Create;

