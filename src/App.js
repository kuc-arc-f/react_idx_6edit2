import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Navbar from './component/Layouts/Navbar';
import Footer from './component/Layouts/Footer';
import About from './component/About';
import Home from './component/Home';
import Test from './component/Test';
/* task */
import TaskCreate from './component/Task/Create';
import TaskIndex from './component/Task/Index';
import TaskEdit from './component/Task/Edit';
import TaskTest from './component/Task/Test';
import TaskImportTask from './component/Task/ImportTask';
/* CmsEdit */
import CmsEditCreate from './component/CmsEdit/Create';
import CmsEditIndex from './component/CmsEdit/Index';
import CmsEditShow from './component/CmsEdit/Show';
import CmsEditEdit from './component/CmsEdit/Edit';
import CmsEditImport from './component/CmsEdit/ImportData';

import CmsPagesIndex from './component/cms/pages/Index';
import CmsPagesCreate from './component/cms/pages/Create';
//import CmsPagesShow from './component/cms/pages/Show';
import CmsPagesEdit from './component/cms/pages/Edit';
import CmsCategoryIndex from './component/cms/category/Index';
import CmsCategoryCreate from './component/cms/category/Create';
//import CmsCategoryShow from './component/cms/category/Show';
import CmsCategoryEdit from './component/cms/category/Edit';
//
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/test' component={Test}/>
            <Route path='/task' component={TaskIndex}/>
            <Route path='/task_create' component={TaskCreate}/>
            <Route path='/task_edit/:id' component={TaskEdit}/>
            <Route path='/task_test' component={TaskTest}/>
            <Route path='/task_import' component={TaskImportTask}/>
            
            <Route path='/cms_edit_create' component={CmsEditCreate}/>
            <Route path='/cms_edit' component={CmsEditIndex}/>
            <Route path='/cms_edit_show/:id' component={CmsEditShow}/>
            <Route path='/cms_edit_edit/:id' component={CmsEditEdit}/>
            <Route path='/cms_edit_import' component={CmsEditImport}/>
            <Route path='/cms_pages' component={CmsPagesIndex}/>
            <Route path='/cms_pages_create' component={CmsPagesCreate}/>
            <Route path='/cms_pages_edit/:id' component={CmsPagesEdit}/>
            <Route path='/cms_category' component={CmsCategoryIndex}/>
            <Route path='/cms_category_create' component={CmsCategoryCreate}/>
            <Route path='/cms_category_edit/:id' component={CmsCategoryEdit}/>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
