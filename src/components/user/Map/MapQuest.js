import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { loginUserfind, selectConnectuser } from '../../../redux/slices/userSlice';

function MapQuest(props) {
  // const [raed, setRaed] = useState([]);
  // const [ahmed, setAhmed] = useState({});
  const [studentState, setStudentState] = useState([]);
  const [Raed, setRaed] = useState([]);
  const [connectUser, error] = useSelector(selectConnectuser);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (Cookies.get('connect.sid')) {
    } else {
      await axios
        .get('http://localhost:5000/auth/logout', { withCredentials: true })
        .then((res) => {
          console.log(res);
          localStorage.removeItem('userInfo');
          dispatch(loginUserfind(res.data));
          props.history.push('/');
        });
    }
  }, [Cookies.get()]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/adminpassdelivery/all/deliveryman/package/${connectUser.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setStudentState(res.data.data);
        console.log('studeeeeent :',studentState);
       
      })
      .catch(function (error) {
        console.log(error);
      });

    const leaflet = window.L;

    leaflet.mapquest.key = props.apiKey;

    const baseLayer = leaflet.mapquest.tileLayer('map');

    const mapInstance = leaflet.mapquest.map('map', {
      center: props.center,
      layers: baseLayer,
      zoom: props.zoom,
      pitch: props.pitch,
      bearing: props.bearing,
    });

    mapInstance.addControl(leaflet.mapquest.control());

    leaflet.control
      .layers({
        Map: baseLayer,
        Hybrid: leaflet.mapquest.tileLayer('hybrid'),
        Satellite: leaflet.mapquest.tileLayer('satellite'),
        Light: leaflet.mapquest.tileLayer('light'),
        Dark: leaflet.mapquest.tileLayer('dark'),
      })
      .addTo(mapInstance);

    leaflet.mapquest.directions().route({
      start: 'beja',
      end: 'tozeur',
      waypoints: [
        
      ],
      optimizeWaypoints: true,
    });
  }, []);
  /*useEffect(() => {
    setRaed(props.Raed);
    //setAhmed(props.Ahmed);
    console.log(props.Raed[1].lng);
   // console.log('tt2', ahmed);
    console.log('tt3', props.Count);

    let tab = [];
    for (var i = 0; i < props.Count; i++) {
      tab.push(
        //[raed[i].lat, raed[i].lng],
        // [props.Ahmed[i].lat, props.Ahmed[i].lng],
      );
    }

    console.log('proppp', props);
  }, [props.Raed]);*/

/*  useEffect(() => {
    setAhmed(props.Ahmed);
    console.log('tt2', props.Ahmed);
    let tab3 = [];
    for (var i = 0; i < props.Count; i++) {
      tab3.push([
        //[props.Ahmed[i].lat, props.Ahmed[i].lng],
        // [props.Ahmed[i].lat, props.Ahmed[i].lng],
      ]);
    }

  
    // console.log('proppp', props);
  }, [props.Ahmed]);*/

  /* componentDidUpdate(prevProps, prevState) {
  console.log('list de Raaaaaaaaaed', props.Raed);
  console.log('list de Ahmeeeeeed', props.Ahmed);
  console.log('Raed Map From', props.Raed);
  console.log(
    'taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab2',
    props.Count
  );*/

  // }
  const mapStyle = {
    height: props.height,
    width: props.width,
  };
  return (
    <div id="map" style={mapStyle}>
      <p style={{ textAlign: 'center' }}>Map loading...</p>
    </div>
  );
}

export default MapQuest;