import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check,sleep } from 'k6';
const URL = "https://test-api.k6.io";

const failures = new Rate('failed requests');

export const options = {
    vus: 10,
    duration: '5s',
    thresholds: {
        failed_requests: ['rate<=0'],
        http_req_duration: ['p(90)<300']
    }
}

//will execute everytime an iteration is done (Executeed syncrously)
export default function()   {
const result = http.get(URL);
check(result, {
    'http response status code is 200' : (r) => r.status === 200,
    'Text Heading is available' : (r) => r.body.includes('test-api.k6.io')
});
 
failures.add(result.status !== 200);

}
