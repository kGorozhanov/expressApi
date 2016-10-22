var Controller = require('../../lib/controller');
var Post = require('./post-facade');

class PostController extends Controller {}

module.exports = new PostController(Post);