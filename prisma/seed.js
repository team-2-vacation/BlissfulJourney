const prisma = require("./client");
const bcrypt = require("bcrypt");
const {createUser} = require("./users");
const {createInterests} = require("./interests");
const {createDestinations} = require("./destinations");
const {createAttractions} = require("./attractions");

const seed = async() => {

const johnPass = await bcrypt.hash(`${123}`, 5)
const jackPass = await bcrypt.hash(`${456}`, 5)
const jillPass = await bcrypt.hash(`${789}`, 5)

const john = await createUser("john@gmail.com", "John", johnPass, "John", "Johnson", true)
const jack = await createUser("jack@gmail.com", "Jack", jackPass, "Jack", "Jackson")
const jill = await createUser("jill@gmail.com", "Jill", jillPass, "Jill", "Jillson", true)

const culture = await createInterests("Cultural Exploration", "An interest in learning about different cultures.", "https://i.imgur.com/oCsUrNk.jpeg")
const outdoor = await createInterests("Outdoor Adventure", "Seeking adventure outdoors like hiking.", "https://i.imgur.com/AZuhonI.jpeg")
const relaxing = await createInterests("Relaxation", "Unwind and relax.", "https://i.imgur.com/IK1iLPR.jpeg")

const paris = await createDestinations("Paris", "France", "City of Light, iconic landmarks, exquisite cuisine.", "April-June", 200, "https://i.imgur.com/sLwRvot.jpeg", "Euro (€)", "French")
const bali = await createDestinations("Bali", "Indonesia", "Tropical haven of beaches, temples, and vibrant culture.", "May-September", 50, "https://i.imgur.com/UfnXuz9.jpeg", "Indonesian Rupiah (IDR)", "")
const reykjavik = await createDestinations("Reykjavik", "Iceland", "A paradise for outdoor adventure, Reykjavik is where Nordic charm meets natural wonders in the world's northernmost capital", "May-September", 180, "https://i.imgur.com/nPQqqf9.jpeg", " Icelandic Króna (ISK)")

const eiffel = await createAttractions("Eiffel Tower", "https://i.imgur.com/romvYx4.jpeg", paris.id)
const louvre = await createAttractions("Louvre", "https://i.imgur.com/yVYUYIB.jpeg", paris.id)
const notreDame = await createAttractions("Notre Dame", "https://i.imgur.com/qNhgLHI.jpeg", paris.id)

const temple = await createAttractions("Uluwatu Temple", "https://i.imgur.com/txhMihx.jpeg", bali.id)
const monkey = await createAttractions("Ubud Monkey Forest", "https://i.imgur.com/v8zb4nN.jpeg", bali.id)
const terrace = await createAttractions("Tegallalang Rice Terraces", "https://i.imgur.com/7vpNMHc.jpeg", bali.id)

const church = await createAttractions("Hallgrímskirkja", "https://i.imgur.com/MZAeagd.jpeg", reykjavik.id)
const sculpture = await createAttractions("The Sun Voyager (Sólfar)", "https://i.imgur.com/dUiPopa.jpeg", reykjavik.id)
const lake = await createAttractions("Tjörnin Lake", "https://i.imgur.com/Now55Qu.jpeg", reykjavik.id)

}
seed()

.then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });