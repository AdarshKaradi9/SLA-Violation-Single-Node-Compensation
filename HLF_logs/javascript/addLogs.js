let network = require('./network.js');
var user=process.argv[2]
async function main() {
    let userid = await network.connectToNetwork(user);
    console.log('connected to user1');
    let logsArr = [
        {
            ram: 8,
            os: 'windows',
            load: 40,
            autoscale: 0
        },
        {
            ram: 8,
            os: 'windows',
            load: 80,
            autoscale: 0
        },
    ]
    let args= {
        uid:user,
        logs:logsArr
    }
    //console.log(args.aid)
    args=[JSON.stringify(args)]
    console.log(typeof(args),args)
    let response = await network.invoke(userid, false, 'addLogs',args);
    if (response.error) {
        console.log(response.error);
    } else {
        console.log("admin initilized");
    }
}
main();

