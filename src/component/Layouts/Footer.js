import React from 'react'
import { Link } from 'react-router-dom'
//
class Footer extends React.Component {
  render(){
    return (
    <div className ="footer_box mt5" id="id_foot" >
      <a href="/about"><p className="p_foot_str">About</p>
      </a>
      <style>{`
      .p_foot_str {
        color: #FFF;
      }
      .footer_box {
        margin-top: 20px;
        background-color: #757575;
        color: #fff;
        padding: 140px 40px;
      }
      `}</style> 
    </div>
    );
  }
}
export default Footer;
