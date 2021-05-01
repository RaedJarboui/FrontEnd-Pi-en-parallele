import React, { Component } from 'react';
import axios from 'axios';
export default class Classlistdeliverybycompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devv: [],
      
    };
  }
  getlistdeliverybycompany() {
    axios
      .get(
        `http://localhost:5000/delivery/listdeliverybycompany/${this.props.con.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          this.setState({
            devv: res.data.data,
          });
          console.log('dev :', this.state.devv);
        }
      });
  }
  componentDidMount() {
    this.getlistdeliverybycompany();
  }
  render() {
    return (
      <>
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          <div className="colllll ">
            {this.state.devv.map((vk, index, key) => (
              <div className="card h-90 mx-3">
                <div className="card-body ">
                  <h5 className="card-title">
                    {/* FIRST_NAME : */}
                    {/* <Link to={`/detaill/${vk._id}`}> {vk.first_name}</Link> */}
                  </h5>
                  <h5 className="card-title">USERNAME : {vk.username}</h5>
                  <h5 className="card-title">EMAIL : {vk.email}</h5>
                  <h5 className="card-title">ADRESSE : {vk.adresse}</h5>
                  <h5 className="card-title">EMAIL : {vk.phone}</h5>
                  <h5 className="card-title">DESCRIPTION : {vk.description}</h5>
                  <h5 className="card-title">FROM : {vk.from}</h5>
                  <h5 className="card-title">TO : {vk.to}</h5>
                </div>
                <div className="card-footer">
                  {/* <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(vk._id)}
                  >
                    <i className="fas fa-times-circle"></i> Delete
                  </a> */}
                  <a
                    className="btn btn-warning mx-3"
                    href={`/homeuser/company/deliverymanagementbyadmincompany/${vk._id}`}
                  >
                    <i className="fas fa-edit"></i> manipulate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Link to="/addlivreeur" className="bot btn btn-secondary my-5">
          Add Book
        </Link> */}
      </>
    );
  }
}