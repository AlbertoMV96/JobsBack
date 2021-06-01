const controller = {}
const Job = require("../models/job")
const User = require("../models/user")
const jobValidator = require("../validators/job")
const Application = require("../models/application")


controller.getJobsCompany = async (req, res) => {
    const companyId = req.body.companyId
    const jobs = []

    try {
        const job = await Job.find({ companyId: companyId })
        
        for (const item of job) {

            const application = await Application.find({ job: item._id })

            jobs.push(
                {
                    job: item,
                    applicants: application.length    
                }
            )
        }

        res.json(jobs)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
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
        if(job){
            if (String(user._id) === String(job.companyId)) {
                const application = await Application.find({ job: jobId })
    
                for (const item of application) {
                    let user = await User.find(item.applicant)
                    users.push(user)
                }
    
                res.json(users)
            } else {
                res.status(403).send({ error: "No estas autorizado a ver los applicants de esta oferta" })
            }
        }else{
            res.status(403).send({ error: "No se encuentra dicha oferta" })
        }
        

    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "Error" })
    }
}
module.exports = controller