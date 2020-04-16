'use strict'

var Project = require('../models/project');
var controller = {

    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy el home'
        });
    },
    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo de accion de test en controller'
        });

    },

    saveProject: function(req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = params.image;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'error al guardar' });

            if (!projectStored) return res.status(404).send({ message: "No se ha guardado el project" });

            return res.status(200).send({ project: projectStored });
        });

        // return res.status(200).send({
        //     project: project,
        //     message: 'metodo saveProject'
        // })
    },

    getProject: function(req, res) {
        var projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({ message: "No existe el project" });
        }

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'error al devolver los datos' });

            if (!project) return res.status(404).send({ message: "No existe el project" });

            return res.status(200).send({ project });
        });
    },

    getProjects: function(req, res) {
        Project.find({}).sort('year').exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'error al devolver los datos' });

            if (!projects) return res.status(404).send({ message: "No existen los projects" });

            return res.status(200).send({ projects });
        });
    },

    updateProject: function(req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'error al devolver los datos' });

            if (!projectUpdated) return res.status(404).send({ message: "No existen los projects" });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, deleteProject) => {
            if (err) return res.status(500).send({ message: 'error al borrar los datos' });

            if (!deleteProject) return res.status(404).send({ message: "No existen los projects" });

            return res.status(200).send({
                project: deleteProject
            });
        });
    }
};

module.exports = controller;