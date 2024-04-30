const express = require('express');
const router = express.Router();

const { getTareas, crearTareas, updateTareas, deleteTareas } = require('../controllers/tareaController')

router.get('/',getTareas)
router.post('/',crearTareas)
router.put('/:id', updateTareas)
router.delete('/:id',deleteTareas)

//router.route('/').get(getTareas).post(crearTareas)
//router.route('/:id').put(updateTareas).delete(deleteTareas)
//funciones equivalentes a las de arriba

module.exports = router