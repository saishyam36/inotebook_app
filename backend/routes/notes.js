import express from "express";
import { notesModel } from "../models/notes.js";
import { fetchUser } from "../middleWare/fetchUser.js";
import { body } from "express-validator";
import { validationResult } from 'express-validator';

const router = express.Router();

//Route1: Get all the Notes: GET "/api/notes/fetchallnotes". Login requiered
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await notesModel.find({ user: req.user.id })
    res.json(notes)
})

//Route2: Add a new Note using: POST "/api/notes/addnote". Login requiered
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new notesModel({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route3: Update an existing Note using: PUT "/api/notes/updatenote". Login requiered
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await notesModel.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await notesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route4: Delete a Note using: Delete "/api/notes/deletenote". Login requiered
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        let note = await notesModel.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await notesModel.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


export { router as notesRouter }
