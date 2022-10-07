const { Thought, User } = require('../models');

const thoughtController = {
    // add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thoughts found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Get all thoughts
    findAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400).json(err);
            });
    },
    // Get thought by _id
    findThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // Update thought by given id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    // Delete thought by given id
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // add reaction
    addReaction({ params, body }, res){
        Thought.findByIdAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // remove reaction by given id
    removeReaction({ params }, res){
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, {$pull: {reactions: {reactionId: params.reactionId}}}, { new: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;