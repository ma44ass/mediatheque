import {Router} from 'express';

const router = Router();

let emprunts = [];
let livres = [
  { id: 1, titre: "Le Petit Prince", auteur: "Saint-Exupéry", disponible: true },
  { id: 2, titre: "Nedjma", auteur: "Kateb Yacine", disponible: true },
  { id: 3, titre: "L'Alchimiste", auteur: "Paulo Coelho", disponible: true }
];



router.post("/", (req, res) => {
    const livreId = Number(req.body.livreId);      
    const adherentId = Number(req.body.adherentId); 

    const livre = livres.find((l) => l.id === livreId);
    if (!livre) return res.status(404).json({ erreur: "Livre introuvable" });

    const adherent = adherents.find((a) => a.id === adherentId);
    if (!adherent) return res.status(404).json({ erreur: "Adhérent introuvable" });

    if (!livre.disponible) return res.status(400).json({ erreur: "Livre non disponible" });

    livre.disponible = false;

    const nouveauEmprunt = {
        id: emprunts.length + 1,
        adherentId,
        livreId
    };

    emprunts.push(nouveauEmprunt);

    return res.status(201).json({ message: "Emprunt sauvegardé", nouveauEmprunt });
});

router.patch("/:id/retour", (req, res) => {
    const id = Number(req.params.id);

    const emprunt = emprunts.find((e) => e.id === id);
    if (!emprunt) return res.status(404).json({ Erreur: "Emprunt n'existe pas" });

    const livre = livres.find((l) => l.id === emprunt.livreId);
    if (!livre) return res.status(404).json({ Erreur: "Livre associé introuvable" });

    livre.disponible = true;

    return res.json({ message: "Livre retourné avec succès" });
});




export default router;