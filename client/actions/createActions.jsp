var _ = require('underscore');

module.exports = function(actions) {
    // Convert each action creator to return a promise
    return _.mapObject(actions, (actionFunc) => {
        // Return function with payload, optional done callback
        return function(payload, done) {
            return new Promise((resolve, reject) => {
                var callback;

                // If done callback specified, make it reject or resolve
                if (actionFunc.length > 1) {
                    callback = (error, success) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(success);
                        }
                    };
                }

                // Call original action function
                actionFunc(payload, callback);

                // If no done callback, just resolve
                if (actionFunc.length < 2) {
                    resolve();
                }
            });
        };
    });
};
