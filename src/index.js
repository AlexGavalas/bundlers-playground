import * as util from "./util";
import msg from "./message.txt";

const items = [];

const add = (a, b) => a + b;

const addToItems = (v) => {
    items.push(v);
    util.log(v);
};

addToItems("789");

util.log(add(1, 2));
util.log(msg);

fetch("/api/users")
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);
