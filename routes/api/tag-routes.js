const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findAll({
			include: [{ model: Product, through: { attributes: ['id', 'tag_id', 'product_id'] } }],
		});
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			include: [{ model: Product, through: { attributes: ['id', 'tag_id', 'product_id'] } }],
		});
		if (!tagData) {
			res.status(404).json({ message: `No tag with the id of '${req.params.id}' was found.` });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!tagData) {
			res.status(404).json({ message: `No tag with the id of '${req.params.id}' was found.` });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const tagData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!tagData) {
			res.status(404).json({ message: `No tag with the id of '${req.params.id}' was found.` });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
