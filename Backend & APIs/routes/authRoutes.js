import { Router } from "express";
import { userController } from "../controller/userController.js";
import { RefreshToken } from "../middleware/refreshToken.js";
import { authenticate } from "../middleware/authenticate.js";
import { DashController as dashController } from "../controller/dashController.js";
import fileUpload from "express-fileupload";

const router = new Router();

router
  .use(fileUpload())
  .post("/register", userController.register)
  .post("/login", userController.login)
  .post("/googlelogin", userController.Googlelogin)
  .post("/applelogin", userController.Applelogin)
  .post("/refresh", RefreshToken)
  .post("/forgotPassword", userController.forgotPassword)
  .post("/otpverify", userController.OtpVerify)
  .post("/emailotpverify", userController.emailverifyOTP)
  .post("/resendotp", userController.resendOtp)
  .post("/resetpassword", userController.setPassword)
  .get("/profile", authenticate, userController.getProfile)
  .delete("/removeuser", authenticate, userController.RemoveUser)
  .patch("/updateprofile", authenticate, userController.updateProfile)
  .post("/logout", authenticate, userController.logout)
  .post("/addmember", authenticate, userController.AddFamilyMember)
  .patch("/updatemember", authenticate, userController.UpdateFamilyMember)
  .get("/members", authenticate, userController.getMembers)
  .delete("/removemember", authenticate, userController.removeMembers)
  .post("/addpost", authenticate, userController.AddPosts)
  .get("/posts", authenticate, userController.GetPost)
  .get("/allposts", authenticate, userController.GetAllPost)
  // .get("/likedposts",authenticate, userController.GetLikedPost)
  .get("/posts/:postid", authenticate, userController.GetPostById)
  .delete("/posts/:postid", authenticate, userController.DeletePostById)

  .post("/likepost/:postid", authenticate, userController.LikePost)

  .post(
    "/likecomment/:postid/:commentid/:replyid?",
    authenticate,
    userController.LikeComment
  )

  .post("/addcomment/:postid", authenticate, userController.AddComment)

  .get("/getsecrets", authenticate, userController.GetSecrets)
  .get("/announcements", authenticate, userController.getAnnouncements)
  .delete("/announcements", authenticate, userController.ClearAnnouncemnet)
  .post("/savechat", authenticate, userController.SaveChat)
  .get("/getChat", authenticate, userController.GetChat)
  .get("/getpagesdata", dashController.GetPagesData)
  .get("/onboarding", userController.getAppOnboarding)
  .post("/block-user", authenticate, userController.blockUser);

export { router };
