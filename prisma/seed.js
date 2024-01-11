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

const culture = await(createInterests)("Cultural Exploration", "An interest in learning about different cultures.", "https://imgur.com/oCsUrNk")
const outdoor = await(createInterests)("Outdoor Adventure", "Seeking adventure outdoors like hiking.", "https://imgur.com/AZuhonI")
const relaxing = await(createInterests)("Relaxation", "Unwind and relax.", "https://imgur.com/IK1iLPR")

const paris = await createDestinations("Paris", "France", "City of Light, iconic landmarks, exquisite cuisine.", "April-June", 200, "https://imgur.com/sLwRvot", "Euro (€)", "French")
const bali = await createDestinations("Bali", "Indonesia", "Tropical haven of beaches, temples, and vibrant culture.", "May-September", 50, "https://imgur.com/UfnXuz9", "Indonesian Rupiah (IDR)", "")
const reykjavik = await createDestinations("Reykjavik", "Iceland", "A paradise for outdoor adventure, Reykjavik is where Nordic charm meets natural wonders in the world's northernmost capital", "May-September", 180, "https://imgur.com/nPQqqf9", " Icelandic Króna (ISK)")

const eiffel = await createAttractions("Eiffel Tower", "https://imgur.com/romvYx4", paris.id)
const louvre = await createAttractions("Louvre", "https://imgur.com/yVYUYIB", paris.id)
const notreDame = await(createAttractions)("Notre Dame", "https://imgur.com/qNhgLHI", paris.id)

const temple = await createAttractions("Uluwatu Temple", "https://imgur.com/txhMihx", bali.id)
const monkey = await createAttractions("Ubud Monkey Forest", "https://imgur.com/v8zb4nN", bali.id)
const terrace = await createAttractions("Tegallalang Rice Terraces", "https://imgur.com/7vpNMHc", bali.id)

const church = await createAttractions("Hallgrímskirkja", "https://imgur.com/MZAeagd", reykjavik.id)
const sculpture = await createAttractions("The Sun Voyager (Sólfar)", "https://imgur.com/dUiPopa", reykjavik.id)
const lake = await createAttractions("Tjörnin Lake", "https://imgur.com/Now55Qu", reykjavik.id)

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