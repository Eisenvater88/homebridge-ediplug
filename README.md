# homebridge-ediplug

This is a plugin for homebridge. It is a fully-working implementation of a ediplug wireless socket accessory.
Works in Version 0.5 with old firmware. Later versions of this code are designed to work with the latest firmware.

## homebridge conf example:
 "accessories": [
 
        {
                "accessory": "Ediplug",
                "name": "some light in some room",
                "user":"admin",
                "pw":"1234",
                "ip":"192.168.1.123"
		"lightbulb":{"t" | "f"}    
        }
 ]


### I use Ediplug to control lights so if "lightbulb" : "t" you will see the light symbol in Home App.
### If "lightbulb" : "f", ediplug will be shown as a socket.

This is just an example which needs to be adjusted to your setup!!

## Special Thanks
Many thanks @seasox for fixing my mistakes. I really appreciate that!!!
