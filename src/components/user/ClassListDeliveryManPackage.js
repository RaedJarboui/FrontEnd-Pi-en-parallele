import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import MapQuest from './Map/MapQuest';

class ClassListDeliveryManPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devv: [],
      list:[],
      listto:[],
      raed: [],
      ahmed:[],
      posfrom: '',
      posfrom1: '',
      tab:[]
      
    };
  }
   componentDidMount() {
    this.getDELVERYY();
  }
  
    
  getDELVERYY = () => {
    axios.get(`http://localhost:5000/adminpassdelivery/all/deliveryman/package/${this.props.con.username}`, { withCredentials: true }).then((res) => {
      this.setState({
        devv: res.data.data,
      });


      axios.get(`http://localhost:5000/adminpassdelivery/all/deliveryman/package/from/${this.props.con.username}`, { withCredentials: true }).then((res) => {
        this.setState({
          list: res.data.data,
          count: res.data.data.length,
        });
       // console.log('list  : ', this.state.list);
        axios.get(`http://localhost:5000/adminpassdelivery/all/deliveryman/package/to/${this.props.con.username}`, { withCredentials: true }).then((res) => {
          this.setState({
            listto: res.data.data,
            count: res.data.data.length,
          });
          this.state.list.map((l) => {
            axios
              .get(`https://geocode.search.hereapi.com/v1/geocode?q=${l.from}&apiKey=cGLlttKCzeHqocL4Oby4wq8vKA0wqOAsKodDDilDWGY`, { withCredentials: true })
              .then((res, err) => {
                this.setState({
                  posfrom: res.data.items[0].position.lat,
                  posfrom1: res.data.items[0].position.lng,
                  posF: res.data.items[0].position,
                });
                this.setState((prevState) => ({
                  raed: [...prevState.raed, this.state.posF],
                }));
                console.log('tab de raed',this.state.raed)
              });
          });

          this.state.listto.map((t) => {
            axios
              .get(`https://geocode.search.hereapi.com/v1/geocode?q=${t.to}&apiKey=cGLlttKCzeHqocL4Oby4wq8vKA0wqOAsKodDDilDWGY`, { withCredentials: true })
              .then((res, err) => {
                this.setState({
                  posto: res.data.items[0].position.lat,
                  posto1: res.data.items[0].position.lng,
                  posT: res.data.items[0].position,
                });
                this.setState((prevState) => ({
                  ahmed: [...prevState.ahmed, this.state.posT],
                }));
                console.log('tab de ahmed',this.state.ahmed)

              });
          });
        });
      });     
  
    });
  };
  render() {   
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2"></div>
            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                name="searchTerm"
                onChange={this.handleTextSearch}
              ></input>
            </div>
          </div>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">NUM</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">adresse</th>
                <th scope="col">phone</th>
                <th scope="col">description</th>
                <th scope="col">from</th>
                <th scope="col">to</th>
                <th scope="col">deliverymanId</th>
                <th scope="col">vehiculeID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.devv.map((vk, index, key) => (
                <tr>
                  <th scope="row">{index}</th>
                  <td>
                    <td>{vk.username}</td>
                  </td>
                  <td>{vk.email}</td>
                  <td>{vk.adresse}</td>
                  <td>{vk.phone}</td>

                  <td>{vk.description}</td>
                  <td>{vk.from}</td>
                  <td>{vk.to}</td>
                  <td>{vk.deliverymanId}</td>
                  <td>{vk.vehiculeID}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
          </div>
        </div>
        <MapQuest
          height={`${window.innerHeight * 0.89}px`}
          width={'100%'}
          center={[40.015831, -105.27927]}
          baseLayer={'light'}
          zoom={10}
          pitch={60}
          bearing={0}
          apiKey={'NCw2anAenpkSgB5XlyjE030OGd7aXdP0'}
          name="raed"
          
          
        />
        
        
        
         
      </>
    );
  }
}
export default withRouter(ClassListDeliveryManPackage);
