Trips = new Mongo.Collection("Trips");

SimpleSchema.debug = true;
Schemas = {};
Schemas.Trips = new SimpleSchema({
  tripName: {
    type: String,
    label: "What should we call this trip?",
    optional: false,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  destinations: {
    type: [String],
    optional: true
  },
  slug: {
    type: String,
    optional: true
  },
  invited: {
    type: [String],
    optional: true
  },
  accepted: {
    type: [String],
    optional: true
  }
});


// Attaching the schema to the Questions Collection
Trips.attachSchema(Schemas.Trips);

Trips.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
