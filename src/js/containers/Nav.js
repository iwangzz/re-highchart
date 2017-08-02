import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'

export default class Footer extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                </div>
                <div className="collapse navbar-collapse">
                  <ul role="nav" className="nav navbar-nav nav-pills">
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/blog" activeClassName="active">Blog</Link></li>
                    <li><Link to="/about" activeClassName="active">About</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
        )
    }
}