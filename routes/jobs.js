const { models } = require('../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
  const jobs = await models.job.findAll();
  res.status(200).json(jobs);
}

async function getById(req, res) {
  const id = req.params.id;
  const job = await models.job.findByPk(id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).send('404 - Not found');
  }
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    const job = await models.job.create(req.body);

    // return the new job
    res.status(201).json(job);
  }
}

async function update(req, res) {
  const id = req.params.id;

  // We only accept an UPDATE request if the `:id` param matches the body `id`
  if (req.body.id === id) {
    await models.job.update(req.body, {
      where: {
        id: id,
      },
    });
    // get the updated job and return it
    const job = await models.job.findByPk(id);
    res.status(200).json(job);
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }
}

async function remove(req, res) {
  const id = req.params.id;
  // get the job to delete so we can return it
  const job = await models.job.findByPk(id);
  await models.job.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json(job);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
