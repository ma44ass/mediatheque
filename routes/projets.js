import {Router} from 'express';


const router = Router();  //init le router

let projects = [
  { id: 1, nom: "Site vitrine", termine: false },
  { id: 2, nom: "App mobile", termine: true },
];


router.get("/", (req, res) => {
  res.json({ message: "GestoPro v1" });
});

//get all projects
router.get("/", (req, res) => {
    const {termine} = req.query;
    let resultats = projects;

    if(termine !== undefined){
        const estTermine = termine === "true"
        resultats = projects.filter((p) => p.termine === estTermine);
    }
  res.json(projects);
});


//get project by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.find((p) => p.id === Number(id));
  if (!project) {
    return res.status(404).json({ message: "Project Introuvable" });
  }

  res.json(project);
});

//create a new project
router.post("/", (req, res) => {
  const { nom } = req.body || {};

  if (!nom || nom.trim() === "") {
    res.status(400).json({ message: "le nom ne doit pas etre vide" });
  } 

  const nouveauProject = { id: projects.length + 1, nom, termine: false };

  projects.push(nouveauProject);
  res.status(201).json(nouveauProject);
});

//update


//Delete a project
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex((p) => p.id === Number(id));
    
    if (projectIndex === -1) {
        return res.status(404).json({ message: "Project introuvable" });
    }

    projects.splice(projectIndex, 1);
    
    res.status(204).end();
});



export default router;
