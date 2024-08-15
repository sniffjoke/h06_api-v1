import express from "express";
import {
    deleteCommentController,
    getCommentByIdController,
    getCommentsController,
    updateCommentController
} from "../controllers/commentsController";
import {errorMiddleware} from "../middlewares/errorMiddleware";
import {contentCommentValidator, idCommentValidator} from "../middlewares/commentsValidators";
import {authMiddlewareWithBearer} from "../middlewares/authMiddleware";


const router = express.Router();

router.route('/')
    .get(getCommentsController)
    // .post(
    //
    // )

router.route('/:id')
    .put(
        authMiddlewareWithBearer,
        idCommentValidator,
        contentCommentValidator,
        errorMiddleware,
        updateCommentController
    )
    .delete(
        authMiddlewareWithBearer,
        idCommentValidator,
        errorMiddleware,
        deleteCommentController
    )
    .get(
        idCommentValidator,
        errorMiddleware,
        getCommentByIdController
    );


export default router
