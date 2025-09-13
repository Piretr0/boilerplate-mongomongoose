require('dotenv').config();
const uri = "mongodb+srv://Piretr0:zaq1@WSX@cluster0.ltidige.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const personSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  const janeFonda = new Person({ id:1, name: "Dar", age: 25, favoriteFoods: ["Pizza", "Pasta"] });
  janeFonda.save((err, data) => {
    if (err) return done(err);
    console.log("Person saved:", data);
    done(null, data); 
  });
};


const createManyPeople = (arrayOfPeople, done) => {

Person.create((arrayOfPeople ), (err, data) => {
  if (err) return done(err);
  console.log("People created:", data);
  done(null, data); 
}
);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name:personName}, (err, data) => {
    if (err) return done(err);
    console.log("People found:", data);
    done(null, data); 
  }
  );
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    console.log("Person found:", data);
    done(null, data); 
  }
  );
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    console.log("Person found by ID:", data);
    done(null, data); 
  }
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      console.log("Person updated:", updatedPerson);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20; 
  Person.findOneAndUpdate({ name:personName}, { age:ageToSet} , { new: true }, (err, data) => {
    if (err) return done(err);
    console.log("Person updated:", data);
    done(null, data); 
  }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    console.log("Person removed:", data);
    done(null, data); 
  }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name:nameToRemove}, (err, data) => {
    if (err) return done(err);
    console.log("People removed:", data);
    done(null, data); 
  }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const data = Person.find({ favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      console.log("Query result:", data);
      done(null, data); 
    }
    );
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
