
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';

//
class Create extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
//        this.state = {title: '', description: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );                 
    }
    handleChangeTitle(e){
        this.setState({title: e.target.value})
    }
    handleChangeContent(e){
        this.setState({content: e.target.value})
    }
    add_item(){
        var task = {
            title: this.state.title,
            content: this.state.content,
            created_at: new Date(),
        }
        this.db.tasks.add( task)
        console.log( task )
        this.props.history.push("/task");
    }
    handleClick(){
        console.log("#-handleClick")
        this.add_item()
//        console.log( this.state )
    }
    render() {
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Create - Task</h1>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)}/>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                    <label>Content:</label>
                    <input type="text" className="form-control"
                     onChange={this.handleChangeContent.bind(this)}/>
                </div>
                </div>
            </div><br />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>Create
                </button>
            </div>
        
        </div>
        )
    }
}
export default Create;

