import {
    getAllBoards, createBoard, updateBackground, getBackground
} from '../controllers/boardController';
import checkJwt from '../authConfig';

module.exports = (app) => {
    // app.get('/boards', getAllBoards);
    app.get('/boards', getBackground);
    app.post('/boards', createBoard);
    app.put('/boards', updateBackground)
}