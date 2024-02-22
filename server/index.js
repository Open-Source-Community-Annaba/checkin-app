express = require("express");
cors = require("cors");
dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const port = process.env.PORT || 8001;
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
const getList = async () => {
  const list = await prisma.user.findMany();
  return list;
};

app.get("/list", async (req, res) => {
  const list = await getList();


  res.json(list);
});

app.post("/update/:id", async (req, res) => {
  const id = Number(req.params.id);
  const name = req.query.name;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  const currentState = user.checked;
  updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      checked: !currentState,
    },
  });

  const list = await getList();

  res.json(list);
});

app.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const name = req.query.name;

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    const list = await getList();
    res.send(list);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Error deleting resource" }); // Send an error response if there's an error
  }
});

function removeEmptyValues(obj) {
  const newObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  }
}

app.post("/add", async (req, res) => {
  let { name, affiliation, occupation, priority } = req.body;
  list = await getList();
  if (affiliation == "") affiliation = null;
  if (name == "") {
    res.json(list);
    return;
  }
  if (occupation == "") occupation = null;
  if (priority == "") priority == null;
  else priority = Number(priority);

  const createUser = await prisma.user.create({
    data: {
      name: name,
      affiliation: affiliation,
      occupation: occupation,
      priority: priority,
    },
  });

  list = await getList();

  res.json(list);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
