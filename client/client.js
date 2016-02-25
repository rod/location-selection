Meteor.subscribe('stories');

Template.body.helpers ({
  stories: function() {
    return Stories.find({}, {sort: {createdAt: -1}});
  },
  storyCount: function() {
    return Stories.find({}).count();
  }
});

Template.body.events ({
  'submit #new-story': function(e) {
    // Prevent default browser form submit
    e.preventDefault();

    // Insert story into collection
    Meteor.call('addStory', e.target.title.value, e.target.body.value);

    // Clear form after submit
    e.target.title.value = '';
    e.target.body.value = '';
  }
});

// Template.story.helpers ({
//   isOwner: function() {
//     return this.owner === Meteor.userId();
//   }
// });

Template.story.events ({
  'click #delete': function() {
    Meteor.call('deleteStory', this._id);
  }
});

Meteor.methods({
  addStory: function(title, body) {
    if(!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    Stories.insert({
      title: title,
      body: body,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteStory: function(id) {
    Stories.remove(id);
  }
});
