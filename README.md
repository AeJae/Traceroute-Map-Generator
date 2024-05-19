# Traceroute-Map-Generator
 
Generates a Leaflet-based map that visualizes the route taken by a packet from 
its source to destination.

### Usage
- Add a single route to the `addresses.json` file following the current format.
- Press the Update JSON button to display the route on the map.

### Optional Functionality
[Ipregistry](https://ipregistry.co/) can be used as a source for IP address locations instead of [ipapi](https://ipapi.co/).<br>
Usage of this requires you to [create an account](https://dashboard.ipregistry.co/signup) and pass in your API key during NetworkManager instantiation.<br>
For example, in Controller: `... = new NetworkManager(true, "<your API key>");`.

## A Project by AJSF ([@AeJae](https://github.com/AeJae))
<a href="https://aejae.github.io/" target="_blank"><img src="https://aejae.github.io/img/logo.png" alt="Logo" width="70px"></a>
