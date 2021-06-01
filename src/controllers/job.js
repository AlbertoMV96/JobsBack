const controller = {}
const Job = require("../models/job")
const User = require("../models/user")
const jobValidator = require("../validators/job")
const Application = require("../models/application")


controller.saveJob = async (req, res) => {
    const user = req.user
    const role = req.user.role
    const validation = jobValidator.validate(req.body)


    if (validation.error) {
        const error = validation.error.details[0].message
        console.log(validation.error)
        res.status(400).send(error)
        return
    }

    if (role != "company") {
        res.status(400).send("Solo una empresa puede crear ofertas de trabajo")

    }

    try {
        console.log(req.body.type)
        const job = new Job({ name: req.body.name, description: req.body.description, location: req.body.location, companyId: user._id, type: req.body.type })

        await job.save()
        res.status(201).send()
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

}

controller.getJob = async (req, res) => {
    const id = req.params.id

    try {
        const job = await Job.findById(id)
        res.json(job)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "El trabajo no existe" })
    }

}

controller.getJobs = async (req, res) => {

    try {
        const job = await Job.find()
        res.json(job)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
    }
}



controller.getJobsQuery = async (req, res) => {

    try {
        const search = req.query.search
        const location = req.query.location
        const type = req.query.type

        const query = {
            $or: [
                {
                    name: new RegExp(search, 'i')
                },
                {
                    description: new RegExp(search, 'i')
                }
            ],
            $and: [
                {
                    type: type,
                    location: location
                }
                ]

        }
        if(type || location){
            query.$and = []
        }
        if(type){
            query.$and.push(
                {
                    type: type
                }
            )
        }

        if(location){
            query.$and.push(
                {
                    location: location
                }
            )
        }
        const job = await Job.find()
        res.json(job)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
    }
}

controller.getJobsFilter = async (req, res) => {
    const companyId = req.body.companyId

    /*
        const user = req.user
        const filters = []
        if (user) {
            filters.push({ applicant: new RegExp(filter, 'i') })
        }
        console.log()
        */

    try {
        const job = await Job.find({ companyId: companyId })
        res.json(job)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
    }
}



controller.deleteJob = async (req, res) => {
    const id = req.params.id
    const user = req.user
    try {
        const job = await Job.findById(id)
        if (String(job.companyId) === String(user._id)) {
            const djob = await Job.findByIdAndDelete(id)
            res.json(djob)
        } else {
            res.status(403).send({ error: "No estas autorizado a borrar esta oferta" })
        }


    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "El trabajo no existe" })
    }
}


controller.getJobApplicants = async (req, res) => {
    const jobId = req.body.jobId
    const users = []
    const user = req.user

    try {
        //Encontramos el trabajo que nos pide para obtener la empresa que lo creo
        const job = await Job.findById(jobId)

        //Comprobamos que el usuario actual es la empresa dueña de esa oferta, para darle permiso para ver los applicants

        if (String(user._id) === String(job.companyId)) {
            const application = await Application.find({ job: jobId })

            for (const item of application) {
                let user = await User.find(item.applicant)
                users.push(user)
            }
    
            res.json(users)
        }else{
            res.status(403).send({ error: "No estas autorizado a ver los applicants de esta oferta" })
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
    }
}

controller.deleteJob = async (req, res) => {
    const id = req.params.id
    const user = req.user
    try {
        const job = await Job.findById(id)
        if (String(job.companyId) === String(user._id)) {
            const djob = await Job.findByIdAndDelete(id)
            res.json(djob)
        }else{
            res.status(403).send({ error: "No estas autorizado a borrar esta oferta" })
        }

        
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "El trabajo no existe" })
    }
}

controller.updateJob = async (req, res) => {
    const validation = jobValidator.validate(req.body)

    if (validation.error) { 
        const error = validation.error.details[0].message
        console.log(validation.error)
        res.status(400).send(error)
        return
    }

    try {
        await Job.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name, description: req.body.description, location: req.body.location
            })
        res.status(201).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

/*

    Endpoint LISTAR ofertas en las que se ha apuntado el usuario
    Endpoint LISTAR ofertas que ha creado la empresa
    Endpoint LISTAR personas que se han apuntado a esa oferta

*/

module.exports = controller