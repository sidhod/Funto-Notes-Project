let str = "India Is My country";
let sp = str.split(" ");
let reverse = sp.reverse();
let join = reverse.join(" ");
console.log(join);


let a = []
for (let i = str.length - 1; i >= 0; i--) {

    a.push(str[i]);
}
console.log(a);
console.log(a.join(""));