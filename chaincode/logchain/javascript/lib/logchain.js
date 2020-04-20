/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
class LogChain extends Contract {

    async initLedger(ctx) {
      console.info('============= START : Initialize Ledger ===========');
      // TYPE 0 50% 100:GOLD, 1 70% 50:SILVER, 2 90% 25:BRONZE
      const logs = [
          {
              uid:'user1',
              violatedLogs: [
                  {
                      tid: 2,
                      ram: 8,
                      os: 'windows',
                      load: 80,
                      autoscale: 0
                  },
              ],
              allLogs: [
                  {
                      tid: 1,
                      ram: 8,
                      os: 'windows',
                      load: 40,
                      autoscale: 0
                  },
                  {
                      tid: 2,
                      ram: 8,
                      os: 'windows',
                      load: 80,
                      autoscale: 0
                  },
                  {
                      tid: 3,
                      ram: 8,
                      os: 'windows',
                      load: 90,
                      autoscale: 1
                  },
              ],
              type: 1,
              compensationNoTimes: 0,
              compensationValue: 50,
              compensationTillNow: 0,
              threshold: 70
          },
          {
              uid: 'user2',
              violatedLogs: [
                  {
                      tid: 2,
                      ram: 8,
                      os: 'windows',
                      load: 60,
                      autoscale: 0
                  },
              ],
              allLogs: [
                  {
                      tid: 1,
                      ram: 8,
                      os: 'windows',
                      load: 40,
                      autoscale: 1
                  },
                  {
                      tid: 2,
                      ram: 16,
                      os: 'windows',
                      load: 60,
                      autoscale: 0
                  },
              ],
              type: 0,
              compensationNoTimes: 0,
              compensationValue: 100,
              compensationTillNow: 0,
              threshold: 50
          },
      ];

      for (let i = 1; i <=logs.length; i++) {
          await ctx.stub.putState('user' + i, Buffer.from(JSON.stringify(logs[i-1])));
          console.info('Added <--> ', logs[i]);
      }
      console.info('============= END : Initialize Ledger ===========');
    }

    async createUser(ctx, args) {
        console.info('============= START : Create Log ===========');
        args= JSON.parse(args);
        let violatedLogs=[];
        let allLogs=[];
        let compensationNoTimes=0;
        let compensationTillNow=0;
        let compensationValue=0;
        let threshold=0;
        let uid=args.username;
        let type=parseInt(args.type);
        if(type==0) {//gold
          compensationValue=100
          threshold=50
        }
        else if(type==1) {//silver
          compensationValue=75
          threshold=75
        }
        else {//bronze
          compensationValue=50
          threshold=90
        }
        const log = {
          uid,
          violatedLogs,
          allLogs,
          type,
          compensationNoTimes,
          compensationValue,
          compensationTillNow,
          threshold,
      };
        await ctx.stub.putState(uid,Buffer.from(JSON.stringify(log)));
        console.info('============= END : Create Log ===========');
    }

    async queryLog(ctx, uid) {
      const logAsBytes = await ctx.stub.getState(uid); // get the Log from chaincode state
      if (!logAsBytes || logAsBytes.length === 0) {
          throw new Error(`${uid} does not exist`);
      }
      console.log(logAsBytes.toString());
      return logAsBytes.toString();
  }

    async addLogsByUser(ctx,uid,vioLog,allLog) {
      const userAsBytes = await ctx.stub.getState(uid);
      if (!userAsBytes || logAsBytes.length === 0) {
        throw new Error(`${uid} does not exist`);
      }
      const user = JSON.parse(userAsBytes.toString());
      user.violatedLogs=user.violatedLogs.concat(vioLog)
      user.allLogs=user.allLogs.concat(allLog);
      await ctx.stub.putState(uid, Buffer.from(JSON.stringify(user)));
    }

    async compensate(ctx,uid) {
      const userAsBytes = await ctx.stub.getState(uid);
      if (!userAsBytes || logAsBytes.length === 0) {
        throw new Error(`${uid} does not exist`);
      }
      const user = JSON.parse(userAsBytes.toString());
      var comp=user.violatedLogs.length;
      user.compensationNoTimes=user.compensationNoTimes+comp;
      user.compensationTillNow=user.compensationTillNow+comp*user.compensationValue;
      user.violatedLogs=[]
      await ctx.stub.putState(uid, Buffer.from(JSON.stringify(user)));
    }
}

module.exports = LogChain;

