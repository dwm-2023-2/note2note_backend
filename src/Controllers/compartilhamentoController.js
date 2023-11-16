const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const compartilhar = db.compart

const createCompartilharDiario = async (req, res) => {
    try{
        const {Titulocompart, Conteudocompart, Datacompart, TipoDeMidia, Privacidade} = req.body;
        const data = {
            Titulocompart,
            Conteudocompart,
            Datacompart,
            TipoDeMidia,
            Privacidade,
        };
        const compartDiario = await CompartilharDiario.create(data);
        if (compartDiario){
            return res.status(201).send(compartDiario)
        } else{
            return res.status(409).send("Details are not correct");
        }
    }catch (error){
        console.log(error);
    }
};
const findAllcompartDiario = async (req, res) => {
    try{
        CompartilharDiario.findAll()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "An error occurred while retrieving registered journals",
                });
            });
    } catch (error) {
        console.log(error);
    }
};

const findcompartDiario = async (req, res) => {
    try{
        const id = req.params.id;

        CompartilharDiario.findByPk(id)
            .then((data) => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Registry with id=${id}.`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error retrieving Registry with id=" + id,
                });
            });
    } catch (error) {
        console.log(error);
    }
};

const updatecompartDiario = async (req, res) => {
    const id = req.params.id;

    CompartilharDiario.update(req.body, {
        where: {id: id},
    })
        .then((num) => {
            if(num == 1) {
                res.send({
                    message: "Registry was updated successfully.",
                });
            } else{
                res.send({
                    message: `Unable to update Registry with id=${id}. Maybe the Registry was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Registry with id=" + id,
            });
        });
};

const deletecompartDiario = async (req, res) => {
    try{
        const id = req.params.id;

        CompartilharDiario.destroy({
            where: {id: id},
        })
        .then((num) => {
            if (num == 1){
                res.send({
                    message: "Registro wsa deleted successfully!",
                });
            } else{
                res.send({
                    message: `It is not possible to delete the Journal Record with id=${id}. Perhaps the Registry was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Unable to delete record with id=" + id,
            });
        });
    } catch (error){
        console.log(error);
    }
};

module.exports = {
    createCompartilharDiario,
    findAllcompartDiario,
    findcompartDiario,
    updatecompartDiario,
    deletecompartDiario, 
};