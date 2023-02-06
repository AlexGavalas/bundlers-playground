module.exports = function (source) {
    if (this.mode === 'production') {
        if (/console\.log/.test(source)) {
            this.emitError(
                new Error(
                    'Found console.log statement. Cleanup before bundling for production!',
                ),
            );
        }
    }

    return source;
};
