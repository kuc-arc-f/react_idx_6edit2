
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibCmsEdit from '../../../libs/LibCmsEdit';
import LibCommon from '../../../libs/LibCommon';

//
class Create extends Component {
  constructor(props){
    super(props)
    this.state = {title: '', content: ''}
    this.handleClick = this.handleClick.bind(this);
    this.db = null
  }
  componentDidMount(){
      var config = LibCmsEdit.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );                 
  }
  handleChangeTitle(e){
      this.setState({title: e.target.value})
  }
  add_item(){
      var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
      var task = {
          save_id : dt,
          name: this.state.title,
          //category: null,
          //content: this.state.content,
          created_at: new Date(),
      }
      this.db.category.add( task)
      console.log( task )
      this.props.history.push("/cms_category");
  }
  handleClick(){
      console.log("#-handleClick")
      this.add_item()
//        console.log( this.state )
  }
  render() {
    return (
    <div className="container">
      <Link to="/cms_category" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h1 className="mt-2">Category - Create</h1>
      <div className="form-group">
        <label>Title:</label>
        <div className="col-sm-6">
            <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)}/>                    
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

