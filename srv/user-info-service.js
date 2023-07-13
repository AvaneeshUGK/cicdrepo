module.exports = cds.service.impl(async function () {
    // API reference
    const express = require('express')
    const cors = require('./cors')
    const api = 'xsuaa_api';

    const app = express()

    app.use(cors)
    

    // // Get the XSUAA host URL from service binding
    // const xsuaa_bind = JSON.parse(process.env.VCAP_SERVICES).xsuaa[0];
    // const api_def = cds.env.requires[api];
    // api_def.credentials.url = xsuaa_bind.credentials.url;

    // // connect to the XSUAA host
    // const xsuaa = await cds.connect.to(api_def);

    // using req.user approach (user attribute - of class cds.User - from the request object)
    this.on('userInfo', req => {
        const user = {
            id : req.user.id,
            tenant : req.user.tenant,
            _roles: req.user._roles,
            attr : req.user.attr
        }

        return user;
    });

    // using the XSUAA API
    this.on('userInfoUAA', async () => {

    // Get the XSUAA host URL from service binding
    // const xsuaa_bind = JSON.parse(process.env.VCAP_SERVICES).xsuaa[0];
    const api_def = cds.env.requires[api];
    // api_def.credentials.url = xsuaa_bind.credentials.url;
    api_def.credentials.url = "https://3157696etrial.authentication.us10.hana.ondemand.com";

    // connect to the XSUAA host
    const xsuaa = await cds.connect.to(api_def);
         let headers = new Headers()
         headers.append('Access-Control-Allow-Origin', '*')
         headers.append('Access-Control-Allow-Methods', 'GET')
        
        // return await xsuaa.get("/userinfo", {Headers:headers})
        return await xsuaa.get("/userinfo", function(req, res, next){
            res.headers('Access-Control-Allow-Origin', '*')
            res.headers('Access-Control-Allow-Methods', 'GET')
            next()
        })
    });
});