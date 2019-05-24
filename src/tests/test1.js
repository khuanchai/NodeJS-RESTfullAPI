

let promise1 = Promise.resolve(1);

main();

async function main(){
  let test = await promise1;
  console.log(test);
}