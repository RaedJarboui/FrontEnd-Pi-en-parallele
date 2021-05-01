import React, { Component } from 'react';
import { setErrors } from '../../user/Errors/setErrors';
import axios from 'axios';
import { withRouter } from 'react-router';
import Select from 'react-select';

class Classdeliverymanagement extends Component {
  constructor(props) {
    super(props);
    // console.log('fghfdgdfb:', this.props.jj);
    this.state = {
      username: '',
      email: '',
      adresse: '',
      phone: '',
      description: '',
      from: '',
      to: '',
      userId: '',
      companyId: '',
      vehiculeID: '',
      deliverymanId: '',
      tablivreur: [],
      jj: [],
      yazid: [],
      selectedoption: '',
      selectoptionvoiture: '',
      selectoption: [],
    };
  }
  validate = (username, email, adresse, phone, description, from, to) => {
    const errors = setErrors(
      username,
      email,
      adresse,
      phone,
      description,
      from,
      to
    );
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === '');
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/delivery/passdelivery/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.data);
          this.setState({
            username: res.data.data.username,
            email: res.data.data.email,
            adresse: res.data.data.adresse,
            phone: res.data.data.phone,
            description: res.data.data.description,
            from: res.data.data.from,
            to: res.data.data.to,
          });
          console.log('ttttt', res.data.data);
        }
      });
    this.getname();
    this.voiture();
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  getname() {
    axios
      .get(
        `http://localhost:5000/livreur/users/deliveryman/${this.props.con.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
       
        if (res.data) {
          const data = res.data.data;

          const options = data.map((x) => ({
            value: x.username,
            label: x.username,
          }));
          console.log(data);
          console.log(options);
          this.setState({
            selectoption: options,
          });
        }
      });
  }
  voiture() {
    axios
      .get(
        `http://localhost:5000/vehicules/getvehicules/${this.props.con.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
       
        if (res.data) {
          const data = res.data.data;

          const options = data.map((x) => ({
            value: x.modele,
            label: x.modele,
          }));
          console.log(data);
          console.log(options);
          this.setState({
            selectoptionvoiture: options,
          });
        }
      });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      username,
      email,
      adresse,
      phone,
      description,
      from,
      to,
      deliverymanId,
      vehiculeID,
    } = this.state;
 
     {
      const data = {
        username: username,
        email: email,
        adresse: adresse,
        phone: phone,
        description: description,
        from: from,
        to: to,
        deliverymanId: this.state.deliverymanId.value,
        vehiculeID: this.state.modele.value,
      };
      console.log(data);
      axios
        .post(`http://localhost:5000/adminpassdelivery/add/${id}`, data,{
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            alert('Edited successfully');
          }
        });
    }
  };
  handelchange = (deliverymanId) => {
    this.setState({ deliverymanId });
    console.log('chniya 3mlt select :', deliverymanId.value);
  };
  handelchangevoiture = (modele) => {
    this.setState({ modele });
    console.log('chniya 3mlt select :', modele.value);
  };
  render() {
    return (
      <div className="col-md-10 mt-3 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Add delivery man </h1>
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <label>username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
            />
         
          </div>

          <div className="form-group">
            <label>email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
            />
           
          </div>

          <div className="form-group">
            <label>adresse</label>
            <input
              type="text"
              className="form-control"
              name="adresse"
              placeholder="Enter adresse"
              value={this.state.adresse}
            />
          
          </div>

          <div className="form-group">
            <label>phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter phone"
              value={this.state.phone}
            />
          
          </div>

          <div className="form-group">
            <label>description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
              value={this.state.description}
            />
           
          </div>

          <div className="form-group">
            <label>from</label>
            <input
              type="text"
              className="form-control"
              name="from"
              placeholder="Enter from"
              value={this.state.from}
              //   onChange={this.handleInputChange}
            />
          
          </div>

          <div className="form-group">
            <label>to</label>
            <input
              type="text"
              className="form-control"
              name="to"
              placeholder="Enter to"
              value={this.state.to}
            />
            
          </div>
          
          <label>delivery_man</label>
          <br />

          <Select
            value={this.state.deliverymanId}
            options={this.state.selectoption}
            name="deliverymanId"
            onChange={this.handelchange}
          />
          <label>car</label>
          <br />

          <Select
            value={this.state.modele}
            options={this.state.selectoptionvoiture}
            name="modele"
            onChange={this.handelchangevoiture}
          />

          <button
            className="btn btn-success"
            type="submit"
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Classdeliverymanagement);

