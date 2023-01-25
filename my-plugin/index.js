module.exports = class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap("My Plugin", (stats) => {
            console.log("Compile done!");
        });
    }
};
