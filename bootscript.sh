#!/bin/bash

cd /var/run
sudo chmod 777 docker.sock
cd -

cd ../fabric-samples/first-network
./byfn.sh down

cd ../../SLA-Violation-Single-Node-Compensation/HLF_logs
./startFabric.sh javascript

cd javascript
./remove.sh

node enrollAdmin.js
node registerInit.js
#comment



