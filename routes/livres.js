import {Router} from 'express';

const router = Router();

let livres = [
  { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
  { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
  { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];


router.get("/livres", (req, res) => res.json(livres));

router.get("/livres/:id", (req, res) => { 
    const id = Number(req.params.id);
    const livre = livres.find((livre) => livre.id === id);

    if (!livre) return res.status(404).json({ Erreur: "Livre non existant" });

    return res.json(livre);
});

router.post("/livres", (req, res) => {
    const { titre, auteur } = req.body;

    if (!titre) return res.status(400).json({ Erreur: "Titre obligatoire" });
    if (!auteur) return res.status(400).json({ Erreur: "Auteur obligatoire" });

    const livre = {
        id: livres.length + 1,
        titre,
        auteur,
        disponible: true
    };

    livres.push(livre);

    return res.status(201).json({ message: "Un nouveau livre disponible", livre });
});

router.patch("/livres/:id", (req, res) => {
    const id = Number(req.params.id);
    const livre = livres.find((livre) => livre.id === id);
    if (!livre) return res.status(404).json({ Erreur: "Livre non existant" });

    const { titre, auteur } = req.body;

    // if (!titre) return res.status(400).json({ Erreur: "Titre obligatoire" });
    // if (!auteur) return res.status(400).json({ Erreur: "Auteur obligatoire" });

    if(!auteur && ! titre) return res.status(400).json({Erreur: "veuillez fournir  le titre  ou l'auteur au moins"})

    if(livre){
        livre.titre = titre;
    }

    if(auteur){
        livre.auteur = auteur;
    }


    return res.status(200).json({ message: "Le livre a été modifié", livre });
});

router.delete("/livres/:id", (req, res) => {
    const id = Number(req.params.id);
    const livreASupprimer = livres.find((livre) => livre.id === id);
    if (!livreASupprimer) return res.status(404).json({ Erreur: "Livre non existant" });

    livres = livres.filter(livre => livre.id !== id);

    return res.status(204).end();
});



export default router;