import http from 'k6/http';
import { sleep, check } from 'k6';


export let options = {
    ext: {
        loadimpact: {
          projectID: 3545462,
          // Test runs with the same name groups test runs together
          name: "k6 OSS-Flip the coin"
        }
      },
    scenarios: {
      S01_Start_with_1_User: {
        executor: 'constant-vus',
        vus: 1,
        duration: '15m',
      },
    },
     S02_Add_1_user:    {
         startTime: '3m',
         executor: 'constant-vus',
         vus: 1,
         duration: '12m'
     },
     S03_Add_2_user:    {
        startTime: '6m',
        executor: 'constant-vus',
        vus: 1,
        duration: '9m'
    },
    S05_Add_3_user:    {
        startTime: '9m',
        executor: 'constant-vus',
        vus: 1,
        duration: '6m'
    },
    S04_Add_3_user:    {
        startTime: '12m',
        executor: 'constant-vus',
        vus: 1,
        duration: '3m'
    },
  };

export default function () {
    let domain = 'https://test.k6.io/';
  let res = http.get(domain, {
      tags: {name: '01_Home'}
  });
  check(res, {
      'is status 200': (r) => r.status === 200,
    'text verification': (r) => r.body.includes('Collection of simple web-pages suitable for load testing')
  });
  sleep(1);

 res =  http.get(domain.concat('flip_coin.php'),{
      tags: { name: '02_VisitFlipCoin'}
  });
 check(res, {
    'is status 200': (r) => r.status === 200,
  'Get Page text verification': (r) => r.body.includes('Imitation page')
});

let data = {bet:'heads'}
res =  http.post(domain.concat('flip_coin.php'),data, {
    tags: { name: '03_ClickOnHeads'}
});
check(res, {
  'is status 200': (r) => r.status === 200,
'Post Page text verification': (r) => r.body.includes('Your bet: heads')
});
}
