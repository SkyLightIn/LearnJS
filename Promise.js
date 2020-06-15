/**
 * promise implementations
 * 
 * @param {Function} fn 
 * wbb
 */

module.exports = function Promise(fn) {
    let callback = null
    this.then = function (cb) {
        callback = cb;
    }
    
    function resolve(value) {
        setTimeout(() => {
            callback(value);
        });
    }
    fn(resolve);
}