# homebridge-ediplug

This is a plugin for homebridge. It is a fully-working implementation of a ediplug wireless socket accessory.
Works in Version 0.5 with old firmware. Later versions of this code are designed to work with the latest firmware.

## homebridge conf example:

```
 "accessories": [
 
        {
                "accessory": "Ediplug",
                "name": "some light in some room",
                "user":"admin",
                "pw":"1234",
                "ip":"192.168.1.123",
                "lightbulb": "t"   
        }
 ]
```

## Lightbulb options

I use Ediplug to control lights so :
- if ```"lightbulb" : "t"``` you will see the **light symbol** in Home App.
- if ```"lightbulb" : "f"```, ediplug will be shown as a **socket**.

This is just an example which needs to be adjusted to your setup!!

## SP-2101W V2 with Firmware 3.00c password

For ediplug SP-2101W V2 the password is generated during the setup of the Smartplug using the EdiSmart App. To find out this password it is necessary to perform the following steps:

1. Find out the IP your Smartplug is actually using (you will need this in step 9). 
2. Delete the Smartplug from the EdiSmart App.
3. Perform a factory reset on the Smartplug .
4. As soon as the Smartplug is in "Installation Mode", connect your Smartphone with the "EdiPlug.Setup xx" WLAN as well as your PC. 
5. In the browser on your Smartphone (or PC connected with the Smartplug) enter "http://192.168.20.3:10000/tnb2". The response should be "OK". 
6. On your Smartphone open the EdiSmart App.
7. On your PC connect again to your "normal" WLAN or LAN.
8. On your Smartphone select the WLAN and password for your Smartplug. 
9. As soon as you are requested to enter a new name for your Smartplug, start **Telnet** with the IP from step 1 and Port 1355 on your PC 
10. On your Smartphone type in the new name for your Smartplug and press OK.
11. Now **immediately**, and while your Smartphone is still configuring your Smartplug, type in ```nvc all``` in the Telnet session on your PC. At the end of the list a password different than "1234" should be shown. If not, again type in ```nvc all``` until the newly generated password is displayed.

(Thx [Harpau](https://www.gitmemory.com/issue/mapero/node-red-contrib-smartplug/22/538773047))

## Special Thanks
Many thanks @seasox for fixing my mistakes. I really appreciate that!!!
