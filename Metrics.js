import http from "k6/http";
import {Counter} from "k6/metrics";

let CounterErrors = new Counter("Errors");

export default function() {
    let res = http.get("https://test.loadimpact.com");
    let contentOK = res.html("h2").text().includes("Welcome to the LoadImpact.com demo site!");
    
    if(!contentOK){
        CounterErrors.add(1);
    }
};