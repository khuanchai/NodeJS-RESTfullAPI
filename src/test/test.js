const axios = require('axios');
let url = 'http://10.138.47.131:8080/DTWS/api/saleout/v1/queryBookNo';
let payload = {
  locationCode: "1100",
  company: "AWN"
};

axios.post(url, payload).then(res => {
  let promises = [];
  for (let iterator of res.data.dataList) {
    let promise = Promise.resolve(iterator);
    promises.push(promise);
  }


  promises.push(Promise.reject("5555"));

  Promise.all(promises).then(values => {
    console.log(values);
  }).catch(err => {
    console.log(err);
  });


}).catch(err => {
  console.log(err);
});