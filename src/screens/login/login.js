import React from "react";
import './Home.css';
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";

export default class Login extends React.Component{

    state = {
        email: '',
        password: ''
    }

    render(){
        return(
            <div className='container'>
              <div className='row'>
                <div className='col-md-6' style={this.styles.colMd6} >
                  <div className='bs-docs-section'>
                      <Card title="Login">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='bs-component'>
                                <fieldset>
                                    <h1>Home UFC</h1>
                                </fieldset>
                            </div>
                          </div>
                        </div>
                        </Card>
                      </div>
                  </div>
                </div>
            </div>
          )
    }

    styles = {
        colMd6:{
            position: 'relative',
            left: '300x'
        }
    };


}