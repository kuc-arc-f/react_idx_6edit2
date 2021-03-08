import React from 'react'
//import axios from 'axios';
import Dexie from 'dexie';
import TableRow from './TableRow';
import LibCommon from '../libs/LibCommon';
import LibCmsEdit from '../libs/LibCmsEdit';
//
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''}
  }  
  componentDidMount(){
    var config = LibCmsEdit.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE );
//    this.add_item()      
  }
  async add_item(){
    var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
    var task = {
      save_id : dt,
      title: "post-0307b-" + dt,
      content: "post-0307b-body-" + dt,
      category_id: "0",
      created_at: new Date(),
    }
console.log( task )
    await this.db.posts.add( task)
  }  
  tabRow(){
    if(this.state.data.items instanceof Array){
      return this.state.data.items.map(function(object, i){
        return <TableRow obj={object} key={i} />
      })
    }
  }    
  render(){
    return(
      <div>
        <h1>test</h1>
        <h2>welcome, test2</h2>
        <hr />
        <div>
          {this.tabRow()}
        </div>
      </div>
    )
  }
}

export default Test;

