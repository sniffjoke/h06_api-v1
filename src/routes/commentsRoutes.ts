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
import {isOwnMiddleware} from "../middlewares/isOwnMiddleware";


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
        isOwnMiddleware,
        errorMiddleware,
        updateCommentController
    )
    .delete(
        authMiddlewareWithBearer,
        idCommentValidator,
        isOwnMiddleware,
        errorMiddleware,
        deleteCommentController
    )
    .get(
        idCommentValidator,
        errorMiddleware,
        getCommentByIdController
    );


export default router
