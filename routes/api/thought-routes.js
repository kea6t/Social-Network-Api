const router = require('express').Router();
const {
    findAllThoughts,
    findThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.post(findAllThoughts);

// Set up GET one, and PUT at /api/thought/:id
router
.route('/:id')
.get(findThought)
.put(updateThought);

// /api/thought/<userId>
router
.route('/:userId')
.post(addThought);

// /api/thought/<thoughtId>/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// /api/userId/thoughtId/<reactionId>
router
.route('/api/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

// /api/thought/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.delete(removeThought);

module.exports = router;