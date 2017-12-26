const gpu = new GPU();

//the length and width of the array
const SIZE = 5000;


const matMult  = gpu.createKernel(function (a, b, size) {
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
}).setOutput([5000, 5000]);


//creating a 5000 X 5000 matrix
const value = [];
for (let i = 0; i < SIZE; i++) {
  const row = [];
  for (j = 0; j < SIZE; j++) {
    row.push(Math.random() * (1000 - 1 + 1) + 1);
  }
  value.push(row);
}

const result = matMult(value, value, SIZE);

console.log(result);
