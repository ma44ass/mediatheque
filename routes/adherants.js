import {Router} from 'express';

const router = Router();

let adherents = [
  { id: 1, nom: "Salma", email: "salma@exemple.ma" },
  { id: 2, nom: "Yassine", email: "yassine@exemple.ma" }
];



router.get("/adherents", (req, res) => res.json(adherents));

router.post("/adherents", (req, res) => {
    const { nom, email } = req.body;

    if (!nom) return res.status(400).json({ Erreur: "Nom obligatoire" });
    if (!email) return res.status(400).json({ Erreur: "Email obligatoire" }); 

    const adherent = {
        id: adherents.length + 1,
        nom,
        email
    };

    adherents.push(adherent);

    return res.status(201).json({ message: "Un nouveau adhérent ajouté", adherent });
});











export default router;