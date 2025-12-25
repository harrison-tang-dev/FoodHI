import { USER, ERR_MESSAGES } from "../utils/ErrorMessages/messages.js";
import { tryCatchFn } from "./userController.js";
import { dashService } from "../services/dash.service.js";
import { authService } from "../services/auth.service.js";

export const DashController = {
  getUsers: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await dashService.getUsers(userId, req.query);
    return res.status(200).json(result);
  }),
  changeApproveStatus: tryCatchFn(async (req, res, next) => {
    const userId = req.params.userid;
    const result = await dashService.changeArroveStatus(userId);
    return res.status(200).json(result);
  }),

  getAllUsers: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await dashService.getAllUsers(userId);
    return res.status(200).json(result);
  }),

  getComments: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await dashService.getComments(userId, req.query);
    return res.status(200).json(result);
  }),

  deleteComments: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.deleteComments(userId, req.query);
    return res.status(200).json(result);
  }),

  AddFamilyMember: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const { memberId } = req.query;
    const result = await authService.AddFamilyMember(
      userId,
      req.body,
      file,
      memberId
    );
    return res.status(200).json(result);
  }),

  getMembers: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await dashService.getMembers(userId, req.query);
    return res.status(200).json(result);
  }),

  GetAllPost: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await dashService.GetAllPost(userId, req.query);
    return res.status(200).json(result);
  }),

  AddUser: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await dashService.AddUser(userId, req.body, file);
    return res.status(200).json(result);
  }),

  updateProfile: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await dashService.updateProfile(userId, req.body, file);
    return res.status(200).json(result);
  }),

  UpdatePost: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await dashService.UpdatePost(
      userId,
      req.body,
      req.params,
      file
    );
    return res.status(200).json(result);
  }),

  AddPosts: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await dashService.AddPosts(userId, req.body, file);
    return res.status(200).json(result);
  }),

  DeleteUser: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const userProfileId = req.params.userProfileId;
    const result = await dashService.DeleteUser(userProfileId);
    return res.status(200).json(result);
  }),

  DeleteUserProfile: tryCatchFn(async (req, res, next) => {
    const result = await dashService.DeleteUserProfile(req.body);
    return res.status(200).json(result);
  }),

  SetupOnboarding: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const filesdata = req.files;
    const result = await dashService.SetupOnboarding(
      userId,
      req.body,
      filesdata
    );
    return res.status(200).json(result);
  }),

  UpdateOnboarding: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.UpdateOnboarding(userId, req.body);
    return res.status(200).json(result);
  }),

  deleteOnboarding: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.deleteOnboarding(userId, req.query);
    return res.status(200).json(result);
  }),

  AddSecrets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const filedata = req.files;
    const result = await dashService.AddSecrets(userId, req.body, filedata);
    return res.status(200).json(result);
  }),

  deleteAppSecrets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.deleteAppSecrets(userId, req.query);
    return res.status(200).json(result);
  }),

  UpdatePostStatus: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.UpdatePostStatus(
      userId,
      req.query,
      req.params
    );
    return res.status(200).json(result);
  }),

  UpdateAppSecrets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const filedata = req.files;
    const result = await dashService.UpdateAppSecrets(
      userId,
      req.body,
      filedata
    );
    return res.status(200).json(result);
  }),

  UpdateFamilyMember: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const { memberId } = req.query;
    const result = await dashService.UpdateFamilyMember(
      userId,
      req.body,
      file,
      memberId
    );
    return res.status(200).json(result);
  }),

  AddPagesData: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.AddPagesData(userId, req.body);
    return res.status(200).json(result);
  }),

  UpdatePagesData: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.UpdatePagesData(
      userId,
      req.body,
      req.query
    );
    return res.status(200).json(result);
  }),

  GetPagesData: tryCatchFn(async (req, res, next) => {
    // const userId = req.user._id;
    const result = await dashService.GetPagesData("userId", req.query);
    return res.status(200).json(result);
  }),

  DeletePagesData: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.DeletePagesData(userId, req.query);
    return res.status(200).json(result);
  }),

  GetSecrets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.GetSecrets(userId, req.query);
    return res.status(200).json(result);
  }),

  Announcements: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.Announcements(userId, req.body);
    return res.status(200).json(result);
  }),

  GetAnnouncemnets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.GetAnnouncements(userId, req.query);
    return res.status(200).json(result);
  }),

  getDashboardData: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.getDashboardData(userId, req.query);
    return res.status(200).json(result);
  }),

  DeleteAnnouncements: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await dashService.DeleteAnnouncements(userId, req.body);
    return res.status(200).json(result);
  }),
};
