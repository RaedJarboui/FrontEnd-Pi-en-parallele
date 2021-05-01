import MapQuest from './MapQuest';
// import { Button } from 'reactstrap';

function CiruitDeliveryMan() {
  return (
    <div className="App">
      <div className="App-header"></div>
      <div
        style={{
          marginTop: '30px',
          marginBottom: '30px',
          boxShadow: '12px 12px 22px grey',
          height: '600px',
        }}
      >
        <MapQuest
          height={`${window.innerHeight * 0.89}px`}
          width={'100%'}
          center={[40.015831, -105.27927]}
          baseLayer={'light'}
          zoom={10}
          pitch={60}
          bearing={0}
          apiKey={'2NmKbEIILnTEItWHHYldG7iA0TLPkG6g'}
        />
      </div>
    </div>
  );
}

export default CiruitDeliveryMan;
