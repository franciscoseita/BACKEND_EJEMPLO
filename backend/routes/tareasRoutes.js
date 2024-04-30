const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

const { getTareas, crearTareas, updateTareas, deleteTareas } = require('../controllers/tareaController')

router.get('/',protect,getTareas)
router.post('/',protect,crearTareas)
router.put('/:id',protect, updateTareas)
router.delete('/:id',protect,deleteTareas)

//router.route('/').get(getTareas).post(crearTareas)
//router.route('/:id').put(updateTareas).delete(deleteTareas)
//funciones equivalentes a las de arriba

module.exports = router