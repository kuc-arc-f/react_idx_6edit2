import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.db = null
        this.handleClickExport = this.handleClickExport.bind(this);
    }
    componentDidMount(){
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
//        this.get_items()        
    }
    handleClickExport(){
        console.log("#-handleClickExport")
        var content = JSON.stringify( this.state.data );
// console.log(content)
        var blob = new Blob([ content ], { "type" : "application/json" });
        var fname = "tasks.json"
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
        this.db.tasks.toArray().then(function (items ) {
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
            <h3>Task - index</h3>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/task_create"
                     className="btn btn-sm btn-primary">+ Create
                    </Link>
                </div>
                <div className="col-md-6">
                    <a id="download" href="" download="tasks.json" onClick={this.handleClickExport}
                     className="btn btn-outline-primary btn-sm">Export
                    </a> 
                    <Link to="/task_import" target="_blank"
                     className="btn btn-sm btn-outline-primary ml-2">Import
                    </Link>
                </div>
            </div><br />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Conent</th>
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

