import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setErrors } from './Errors/setErrors';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
//import 'animate.css';
import {store} from "react-notifications-component";
class Classmakedelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.con.username,
      email: this.props.con.email,
      adresse: this.props.con.adresse,
      phone: this.props.con.phone,
      description: '',
      from: '',
      to: '',
      userId: this.props.con.id,
      companyId: this.idcompany,
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  validate = (description, from, to) => {
    const errors = setErrors(description, from, to);
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === '');
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      adresse,
      phone,
      description,
      from,
      to,
      userId,
      companyId,
    } = this.state;
    if (this.validate(description, from, to)) {
      const data = {
        username: username,
        email: email,
        adresse: adresse,
        phone: phone,
        description: description,
        from: from,
        to: to,
        userId: userId,
        companyId: this.idcompany,
      };
      console.log(data);
      axios
        .post(
          'http://localhost:5000/delivery/add',
          data,

          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log('Added');
            this.setState({
              description: '',
              from: '',
              to: '',
            });
          }
        });
        store.addNotification({
          title:"Delivery added successfully",
          message:"Client added the Delivery",
          type:"success",
          container:"top-left",
          insert:"top",
          animationIn:["animated","fadeIn"],
          animationOut:["animated","fadeOut"],
          dismiss: {
            duration: 2000,
            showIcon:true
          },
          width: 600
        })
    }
 function showNotification(){
            const notification = new Notification ("New message from dcode",{
             body:"hey mate, how are you"
           })
        }
        console.log(Notification.permission)
        if(Notification.permission ==="granted"){
          alert("we have permission")
        }else if(Notification.permission !=="denied"){
          Notification.requestPermission().then(permission=>{
            showNotification();         
                 })
        }
        
       
    console.log('lllll', this.idcompany);
  };
  componentDidMount() {
    this.idcompany = this.props.match.params.id;
    console.log('id company :', this.idcompany);
  }
  render() {
    console.log('proppp', this.props.con.username);
    console.log('idcomp55', this.idcompany);

    return (
      <div className="col-md-10 mt-3 mx-auto">
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <label>description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            {this.state.errors.description && (
              <div className="text-danger">{this.state.errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label>from</label>
            <input
              type="text"
              className="form-control"
              name="from"
              placeholder="Enter from"
              value={this.state.from}
              onChange={this.handleInputChange}
            />
            {this.state.errors.from && (
              <div className="text-danger">{this.state.errors.from}</div>
            )}
          </div>

          <div className="form-group">
            <label>to</label>
            <input
              type="text"
              className="form-control"
              name="to"
              placeholder="Enter to"
              value={this.state.to}
              onChange={this.handleInputChange}
            />
            {this.state.errors.to && (
              <div className="text-danger">{this.state.errors.to}</div>
            )}
          </div>

          {/* <a href="/" className="btn btn-success" onClick={this.onSubmit}>
            &nbsp;Submit
          </a> */}
          <button
            className="btn btn-success"
            type="submit"
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
        </form>
        <ReactNotification/>     

      </div>
    );
  }
}
export default withRouter(Classmakedelivery);
