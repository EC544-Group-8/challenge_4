# Challenge 4: Cloud-Based Data Collection and Visualization

### Task
create a system that will save data collected from a network of sensors and will allow visualization of data in both historical and real time views. Data should be hosted two ways: 
- [ ] on the Particle cloud  
- [ ] [optional] local version of particle cloud on the pi

### Deliverables
- [ ] Presentation based on requirements
- [ ] Data in engineering units
- [ ] Demonstration of solution 
- [ ] Graphics / video posted to piazza

### To-Do
- [ ] Sense temperature on each of (5) Particle Nodes
- [ ] Create a Google Cloud SQL server 
- [ ] Connect each Particle to the Database
- [ ] Salvage front end from challenge 2 for live plots
- [ ] Connect node.js server to database 

## System Components
- [ ] Photon        : Collect Data
- [ ] Router        : Connect Photon to Google DB & act as gateway to webpage server
- [ ] Raspberry Pi  : Host webpage and pull data from DB
