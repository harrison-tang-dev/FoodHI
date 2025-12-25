import { USER, ERR_MESSAGES } from "../utils/ErrorMessages/messages.js";
import { authService } from "../services/auth.service.js";
import { store } from "../../app.js";

export const tryCatchFn = (fn) => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};

const validateRequiredFields = (fields, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !fields[field]);
  return missingFields;
};

export const userController = {
  register: tryCatchFn(async (req, res, next) => {
    const requiredFields = ["name", "email", "password", "termscondition"];
    const missingFields = validateRequiredFields(req.body, requiredFields);

    // If there are missing fields, throw an error with details
    if (missingFields.length > 0) {
      throw {
        status: 422,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      };
    }
    const result = await authService.register(req.body);
    res.status(201).json(result);
  }),

  login: tryCatchFn(async (req, res, next) => {
    const result = await authService.login(req.body, req.headers);

    return res.status(200).json(result);
  }),

  Googlelogin: tryCatchFn(async (req, res, next) => {
    const result = await authService.Googlelogin(req.body, req.headers);

    return res.status(200).json(result);
  }),

  Applelogin: tryCatchFn(async (req, res, next) => {
    const result = await authService.Applelogin(req.body, req.headers);

    return res.status(200).json(result);
  }),

  forgotPassword: tryCatchFn(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      throw { status: 401, message: ERR_MESSAGES.FIELD_REQUIRED };
    }
    const result = await authService.forgotpassword(email);
    return res.status(200).json(result);
  }),

  OtpVerify: tryCatchFn(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw { status: 422, message: ERR_MESSAGES.FIELD_REQUIRED };
    }
    const result = await authService.verifyOTP(email, otp);
    return res.status(200).json(result);
  }),

  emailverifyOTP: tryCatchFn(async (req, res, next) => {
    const data = req.body;
    const result = await authService.emailVerify(data);
    res.status(200).json(result);
  }),

  resendOtp: tryCatchFn(async (req, res, next) => {
    const data = req.body;
    const result = await authService.resendotp(data);
    return res.status(200).json(result);
  }),

  setPassword: tryCatchFn(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 422, message: ERR_MESSAGES.FIELD_REQUIRED };
    }
    const result = await authService.resetPassword(email, password);
    return res.status(200).json(result);
  }),

  getProfile: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.getProfile(userId);
    return res.status(200).json(result);
  }),

  updateProfile: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await authService.updateProfile(userId, req.body, file);
    return res.status(200).json(result);
  }),

  logout: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const refreshToken = req.body.refreshtoken;
    const result = await authService.logout(userId, refreshToken, req.headers);
    res.status(200).json(result);
  }),

  AddFamilyMember: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await authService.AddFamilyMember(userId, req.body, file);
    return res.status(200).json(result);
  }),

  UpdateFamilyMember: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await authService.UpdateFamilyMember(userId, req.body, file);
    return res.status(200).json(result);
  }),

  getMembers: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;

    const result = await authService.getMembers(userId, req.query);
    return res.status(200).json(result);
  }),

  removeMembers: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { membersemail } = req.query;
    const result = await authService.removeMembers(userId, membersemail);
    return res.status(200).json(result);
  }),

  RemoveUser: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.RemoveUser(userId);
    return res.status(200).json(result);
  }),

  AddPosts: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const file = req?.files?.file;
    const result = await authService.AddPosts(userId, req.body, file);
    return res.status(200).json(result);
  }),

  GetPost: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.GetPost(userId, req.query);
    return res.status(200).json(result);
  }),

  GetAllPost: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.GetAllPost(userId, req.query);
    return res.status(200).json(result);
  }),

  DeletePostById: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { postid } = req.params;
    const result = await authService.DeletePostById(userId, postid);
    return res.status(200).json(result);
  }),

  GetPostById: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { postid } = req.params;
    const result = await authService.GetPostById(userId, postid);
    return res.status(200).json(result);
  }),

  LikePost: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { postid } = req.params;
    const result = await authService.LikePost(userId, postid);
    return res.status(200).json(result);
  }),

  LikeComment: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { postid, commentid, replyid } = req.params;
    const result = await authService.LikeComment(
      postid,
      commentid,
      userId,
      replyid
    );
    return res.status(200).json(result);
  }),

  AddComment: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const { postid } = req.params;
    const result = await authService.AddComment(userId, postid, req.body);
    return res.status(200).json(result);
  }),

  getAppOnboarding: tryCatchFn(async (req, res, next) => {
    const { type } = req.query;
    const result = await authService.getAppOnboarding(type);
    return res.status(200).json(result);
  }),

  GetSecrets: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.GetSecrets(userId, req.query);
    return res.status(200).json(result);
  }),

  getAnnouncements: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.getAnnouncements(userId, req.query);
    return res.status(200).json(result);
  }),

  ClearAnnouncemnet: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.ClearAnnouncemnet(userId, req.body);
    return res.status(200).json(result);
  }),

  SaveChat: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.SaveChat(userId, req.body);
    return res.status(200).json(result);
  }),

  GetChat: tryCatchFn(async (req, res, next) => {
    const userId = req.user._id;
    const result = await authService.getChatData(userId, req.query);
    return res.status(200).json(result);
  }),
  blockUser: tryCatchFn(async (req, res, next) => {
    const { comment_user_id } = req.body;

    if (!comment_user_id)
      return res
        .status(400)
        .json({ message: "Comment user id is required", status: false });

    const auth_user_id = req.user._id;
    const result = await authService.blockUser(auth_user_id, comment_user_id);
    return res.status(200).json(result);
  }),
};
