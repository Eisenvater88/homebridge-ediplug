var request = require("request");
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-ediplug", "Ediplug", EdiplugAccessory);
}

function EdiplugAccessory(log, config) {
  this.log = log;
  this.ip = config["ip"];
  this.user = config["user"];
  this.pw = config["pw"];
  this.service = null;
 if(config["lightbulb"]=="t"){
     this.service = new Service.Lightbulb(this.name);
     this.service
         .getCharacteristic(Characteristic.On)
         .on('get', this.getState.bind(this))
         .on('set', this.setState.bind(this));
 } else {
     this.service = new Service.Outlet(this.name);
     this.service
         .getCharacteristic(Characteristic.On)
         .on('get', this.getState.bind(this))
         .on('set', this.setState.bind(this));
 };
}

EdiplugAccessory.prototype.getState = function(callback) {
  this.log("Getting current state...");
  var myXMLText = '<?xml version="1.0" encoding=""UTF8"?><SMARTPLUG id="edimax"><CMD id="get"><Device.System.Power.State></Device.System.Power.State></CMD></SMARTPLUG>';
  request.post({
    headers: { "content-type": "application/xml",  // <--Very important!!!
    },
    body: myXMLText,
    url: "http://"+this.ip+":10000/smartplug.cgi",
    auth: {
              user: this.user,
              pass: this.pw,
              sendImmediately: false
    },
  }, function(err, response, body) {
    if(!err){
      	var result = body.replace('<?xml version="1.0" encoding="UTF8"?><SMARTPLUG id="edimax"><CMD id="get"><Device.System.Power.State>','').replace('</Device.System.Power.State></CMD></SMARTPLUG>','')
      	this.log("Light is %s", result);
	var an = result == "ON";
	callback(null,an);
     }else{
	this.log("Error getting state from plug. Response: %s", response);	
	callback(err);
	}
  }.bind(this));
}
  
EdiplugAccessory.prototype.setState = function(state, callback) {
  var ediState = state;
	if(state){
		ediState= 'ON';
	}
	else{
		ediState='OFF';
	}

  this.log("Set state to %s", ediState);

  var myXMLText = '<?xml version="1.0" encoding="utf-8"?><SMARTPLUG id="edimax"><CMD id="setup"><Device.System.Power.State>'+ ediState +'</Device.System.Power.State></CMD></SMARTPLUG>';
  request.post({
  	headers: { "content-type": "application/xml",  // <--Very important!!!
    	},
    	body: myXMLText,
        url: "http://"+this.ip+":10000/smartplug.cgi",
        auth: {
                  user: this.user,
                  pass: this.pw,
                  sendImmediately: false
        },
  }, function(err, response, body) {

  if (!err && response.statusCode == 200) {
      this.log("State change complete.");     
      callback(null); // success
  }
  else {
      this.log("Error '%s' switching state. Response: %s", err, body);
      callback(err || new Error("Error switching state state."));
  }
 }.bind(this));
}

EdiplugAccessory.prototype.getServices = function() {
  return [this.service];
}
