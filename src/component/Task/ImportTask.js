
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';

//
class ImportTask extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var self = this
        window.addEventListener("load", function() {
            window.document.getElementById("file1").addEventListener("change", function() {
                //console.log("#-change")
                self.change_proc()
            });
        });        
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );

    }
    change_proc(){
        console.log("#-change_proc")
        console.log("#-change_proc")
//        $('.loading').removeClass('hide');
        var self = this
        var files = window.document.getElementById('file1').files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log("i: " + i );                
            console.log("Name: " + file.name);
            console.log("Size: " + file.size);
            console.log("Type: " + file.type);
            console.log("Date: " + file.lastModified);
            console.log("Date: " + file.lastModifiedDate);
            
            var reader = new FileReader();
            reader.onload = async function(evt) {
                console.log("State: " + evt.target.readyState);
                var result =evt.target.result;
                var dat = JSON.parse(result || '[]')
console.log( dat )
                await self.add_item(dat)
                //self.items = dat
            };
            reader.onerror = function(evt) {
                console.log(evt.target.error.name);
            };
            reader.readAsText(file, "utf-8");             
        }                

    }
    async add_item(items){
        var self = this
        this.db.tasks.clear()
        await items.forEach(function(item){
            var task = {
                title: item.title,
                content: item.content,
                created_at: new Date(item.created_at),
            }
            self.db.tasks.add( task)
        });
        setTimeout(function () {
            alert("Complete ,import data success.");
            console.log("# timer.cb")
//            self.props.history.push("/task");
            window.location.href = "/"
        }, 1000)        
    }    
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    render() {
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h3 className="mt-2">Tasks- import:</h3>
            <hr />
            <p>select , json file</p>            
            <div>
                <input type="file" id="file1" className="btn btn-outline-primary" />
            </div>
            <br /> 
            <p>※連続でファイルを読み込む場合、再読み込みして下さい。</p>               
        
        </div>
        )
    }
}
export default ImportTask;

