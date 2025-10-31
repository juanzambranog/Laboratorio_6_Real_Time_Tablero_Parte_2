const root = ReactDOM.createRoot(document.getElementById("root"));

// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
var host = window.location.host;
console.log("Host: " + host);
// En heroku necesita conexiones seguras de web socket
var url = 'wss://' + (host) + '/bbService';
if(host.toString().startsWith("localhost")){
url = 'ws://' + (host) + '/bbService';
}
console.log("URL Calculada: " + url);
return url;
}

class WSBBChannel {
  constructor(URL, callback) {
    this.URL = URL;
    this.wsocket = new WebSocket(URL);
    this.wsocket.onopen = (evt) => this.onOpen(evt);
    this.wsocket.onmessage = (evt) => this.onMessage(evt);
    this.wsocket.onerror = (evt) => this.onError(evt);
    this.receivef = callback;
  }

  onOpen(evt) { console.log("WS open", evt); }
  onMessage(evt) {
    if (evt.data != "Connection established.") {
      this.receivef(evt.data);
    }
  }
  onError(evt) { console.error("WS error", evt); }
  send(x, y) {
    let msg = '{ "x": ' + (x) + ', "y": ' + (y) + "}";
    this.wsocket.send(msg);
  }
  close() { this.wsocket.close(); }
}

function BBCanvas() {
  const [svrStatus, setSvrStatus] = React.useState({loadingState: 'Loading Canvas...'});
  const comunicationWS = React.useRef(null);
  const myp5 = React.useRef(null);

  const sketch = function (p) {
    p.setup = function () {
      p.createCanvas(700, 410);
    }

    p.draw = function () {
      if (p.mouseIsPressed === true) {
        p.fill(0, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
        if (comunicationWS.current) comunicationWS.current.send(p.mouseX, p.mouseY);
      } else {
        p.fill(255, 255, 255);
      }
    }
  };

  React.useEffect(() => {
    myp5.current = new p5(sketch, 'container');
    setSvrStatus({loadingState: 'Canvas Loaded'});
    comunicationWS.current = new WSBBChannel(BBServiceURL(), (msg) => {
      var obj = JSON.parse(msg);
      drawPoint(obj.x, obj.y);
    });
    return () => {
      if (comunicationWS.current) comunicationWS.current.close();
    };
  }, []);

  function drawPoint(x, y) {
    myp5.current.ellipse(x, y, 20, 20);
  }

  return (
    <div>
      <h4>Drawing status: {svrStatus.loadingState}</h4>
      <div id="container"></div>
    </div>
  );
}

function Editor({name}) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <hr/>
      <div id="toolstatus"></div>
      <hr/>
      <div id="container"><BBCanvas /></div>
      <hr/>
      <div id="info"></div>
    </div>
  );
}

root.render(<Editor name="Daniel" />);
