import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibCmsEdit from '../../../libs/LibCmsEdit';
import LibDexie from '../../../libs/LibDexie';

//
class Index extends Component {
  constructor(props) {
      super(props);
      this.state = {data: '', data_org: ''}
      this.db = null
      this.handleClickExport = this.handleClickExport.bind(this);
  }
  componentDidMount(){
      var config = LibCmsEdit.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );
      this.get_items()        
  }
  handleClickExport(){
      console.log("#-handleClickExport")
      var config = LibCmsEdit.get_const()
      var dt = new Date()
      var data = {
          save_date: dt, 
          file_version: config.file_version , 
          items: this.state.data_org, 
          category_items: [], 
          page_items: [], 
      }        
      var content = JSON.stringify( data );
// console.log(content)
      var blob = new Blob([ content ], { "type" : "application/json" });
      var fname = "cms.json"
      if (window.navigator.msSaveBlob) { 
          console.log("#-msSaveBlob")
          window.navigator.msSaveBlob(blob, fname ); 
          window.navigator.msSaveOrOpenBlob(blob, fname ); 
      } else {
          console.log("#-msSaveBlob-false")
          document.getElementById("download").href = window.URL.createObjectURL(blob);
      }        
//        console.log( this.state )
  }    
  get_items(){
      var self = this
      this.db.category.toArray().then(function (items ) {
          self.setState({ data_org: items })
          var tasks = LibDexie.get_reverse_items(items)
          self.setState({ data: tasks })
console.log( tasks )
      });
  }
  tabRow(){
      if(this.state.data instanceof Array){
          return this.state.data.map(function(object, i){
          return <IndexRow obj={object} key={i} />
          })
      }
  }
  render(){
    return (
    <div className="container">
      <h3>Category</h3>
      <div className="row">
          <div className="col-md-6">
              <Link to="/cms_category_create"
              className="btn btn-sm btn-primary">+ Create
              </Link>
          </div>
          <div className="col-md-6">
          </div>
      </div><br />
      <table className="table table-hover">
          <thead>
          <tr>
              <th>Title</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
              {this.tabRow()}
          </tbody>
      </table>
    </div>
    )
  }
}

export default Index;

