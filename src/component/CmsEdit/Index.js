import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibCmsEdit from '../../libs/LibCmsEdit';
import LibCms from '../../libs/LibCms';
import LibDexie from '../../libs/LibDexie';
import LibPagenate from '../../libs/LibPagenate';
import PagingBox from '../Layouts/PagingBox';

//
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', data_org: '', page: 1,
      pagingDisplay: 0,
      category_items: [], page_items:[] ,
    }
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
          category_items: this.state.category_items, 
          page_items: this.state.page_items, 
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
  async get_items(){
    var items = await this.db.posts.toArray()
    this.setState({ data_org: items })
    var posts = LibDexie.get_reverse_items(items)
    var category_items = await this.db.category.toArray()
    posts = LibCms.get_post_items(posts, category_items)
    LibPagenate.init()
    posts = LibPagenate.getOnepageItems(posts, 0 , 10)
    var display = LibPagenate.is_paging_display(posts.length)
    var page_items = await this.db.pages.toArray()
    this.setState({
      data: posts ,category_items: category_items,
      page_items: page_items, pagingDisplay: display,
    })
//console.log(posts)
//console.log(display, posts.length)
  }
  tabRow(){
    if(this.state.data instanceof Array){
      return this.state.data.map(function(object, i){
//console.log(object)
        return <IndexRow obj={object} key={i} />
      })
    }
  }
  async parentMethod(page){
    console.log("#parentMethod.p=" + page ) 
    var items = await this.db.posts.toArray()
    var posts = LibDexie.get_reverse_items(items)
    var category_items = await this.db.category.toArray()
    posts = LibCms.get_post_items(posts, category_items)     
    LibPagenate.init()
    var pageInfo=LibPagenate.get_page_start(page)
    var display = LibPagenate.is_next_display(page, posts.length )
//console.log(pageInfo)
    posts = LibPagenate.getOnepageItems(posts, pageInfo.start , pageInfo.end )
//console.log(posts)
    this.setState({
      page: page,
      data: posts ,
      pagingDisplay: display,
    })
  }
  async handleChangeSelect(e){
    var id = e.target.value
// console.log(id)
    var items = await this.db.posts.toArray()
    items = LibCms.get_category_data(items, id)
    items = LibDexie.get_reverse_items(items)
    var category_items = await this.db.category.toArray()
    items = LibCms.get_post_items(items, category_items)  
// console.log(items)
    this.setState({
      data: items ,
      pagingDisplay: 0,
    })
  }  
  render(){
    var paginateDisp = this.state.pagingDisplay
    var category_items = this.state.category_items
//console.log(this.state.category_items)
    return (
    <div className="container">
      <h3>Posts</h3>
      <div className="row">
        <div className="col-md-6">
            <Link to="/cms_edit_create"
              className="btn btn-sm btn-primary">+ Create
            </Link>
        </div>
        <div className="col-md-6">
            <a id="download" href="" download="cms.json" onClick={this.handleClickExport}
              className="btn btn-outline-primary btn-sm">Export
            </a> 
            <Link to="/cms_edit_import" target="_blank"
              className="btn btn-sm btn-outline-primary ml-2">Import
            </Link>
        </div>
      </div>
      <hr className="mt-2 mb-2"/>
      <div className="row">
        <div className="col-sm-6"></div>
        <div className="col-sm-6">
          <label>Category :</label>
          <div >
            <select id="category_id" name="category_id" className="form-control"
            onChange={this.handleChangeSelect.bind(this)}>
              <option value="0">Select please</option>
              {category_items.map((item, index) => {
    // console.log(item)
                return(<option key={index}
                  value={item.save_id}>{item.name}</option>)            
              })}          
            </select>          
          </div>      
        </div>
      </div>
      <table className="table table-hover mt-2">
        <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          {this.tabRow()}
        </tbody>
        <hr />
        <div className="paging_box_wrap mt-3">
          <PagingBox parent_func={(id) => this.parentMethod(id)}
            page={this.state.page} paginateDisp={paginateDisp} />
        </div>        
      </table>
    </div>
    )
  }
}

export default Index;

