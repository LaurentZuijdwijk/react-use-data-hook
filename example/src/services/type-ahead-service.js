let cnt = 0;

const fruits = ['apple', 'pear', 'pineapple', 'orange']
const veg = ['spinach', 'tomato', 'carrot', 'red cabbage', 'green cabbage']


let timeout = 5000;
export default {
  getFruit: (value) =>
    new Promise((resolve, reject) => {
      if(value === 'err') return reject('There was an error')
      cnt++;
      if (cnt === 2) timeout = 100;
      setTimeout(() => {
        const regexp = new RegExp(value, 'ig')
        return resolve(fruits.filter(el=> el.match(regexp) ));
      }, timeout);
    }),
    getVeg: (value) =>
    new Promise((resolve, reject) => {
      if(value === 'err') return reject('There was an error')
      cnt++;
      if (cnt === 2) timeout = 100;
      setTimeout(() => {
        const regexp = new RegExp(value, 'ig')
        return resolve(veg.filter(el=> el.match(regexp) ));
      }, timeout);
    })
};
