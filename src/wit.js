import axios from 'axios';
import jsonp from 'jsonp';

export class WitAI {
    constructor(props){
        this.apiKey = props.apiKey;
        this.proxyKey = "xu6l3ribQd87gxJ00h6GwPVxmhRl9TiaPtP36pEe" // Todo pass this as a param
    }

    converse(onDidRecieveData){
        this.sessionId = "abc1235";
        this.onDidRecieveDataCb = onDidRecieveData;

        this.proxyEndpoint = "https://om938bxgwj.execute-api.us-east-1.amazonaws.com/dev/witProxy";

        axios.get(this.proxyEndpoint, {
            headers: {
                'X-Api-Key': this.proxyKey,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            params: {
                session_id: this.sessionId,
                q: "hey",
                v: 20141022
            }
        }).then((data)=>{
            debugger;
            console.log("Data");
        })
        console.log("Starting chat");
        console.log(this.apiKey);
    }
}