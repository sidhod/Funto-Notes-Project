import { template } from '@hapi/joi/lib/errors';
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegistration = async (req, res, next) => {
  try {
    const data = await UserService.newUserRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
  try {
    console.log("details", req);
    const data = await UserService.loginUser(req.body);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Forgot password of a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User find successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Forgot password of a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body, req.body.email);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User find successfully'
    });
  } catch (error) {
    next(error);
  }
};