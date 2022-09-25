const router = require('express').Router();
const { addComment, addReply, removeReply, removeComment } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
.route('/:pizzaId')
.post(addComment);

// /api/pizzaId/<commentId>
router
.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// /api/pizzaId/commentId/<replyId>
router
.route('/api/:pizzaId/:commentId/:replyId')
.delete(removeReply);

// /api/comments/<pizzaId>/<commentId>
router
.route('/:pizzaId/:commentId')
.delete(removeComment);

module.exports = router;