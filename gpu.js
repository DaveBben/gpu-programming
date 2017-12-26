const gpu = new GPU();

//the length and width of the array
const SIZE = 1000;


const matMult  = gpu.createKernel(function (a, b) {
  let sum = 0;
  for (let i = 0; i < this.constants.size; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
 } , {
    constants: { size: SIZE },
    output: [SIZE,SIZE],
  });


//creating a 5000 X 5000 matrix
const value = [];
for (let i = 0; i < SIZE; i++) {
  const row = [];
  for (j = 0; j < SIZE; j++) {
    row.push(Math.random() * (1000 - 1 + 1) + 1);
  }
  value.push(row);
}

const result = matMult(value, value);

console.log(result);
