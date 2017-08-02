import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container" style={{height: '500px'}}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}