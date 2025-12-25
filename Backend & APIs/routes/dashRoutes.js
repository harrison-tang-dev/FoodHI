import { Router } from "express";
import fileUpload from "express-fileupload";
import { DashController as dashController } from "../controller/dashController.js";
import { userController } from "../controller/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { RefreshToken } from "../middleware/refreshToken.js";
import { hasRoleCheck } from "../middleware/authenticate.js";

const router = new Router();

router
  .use(fileUpload())

  .post("/login", userController.login)
  .post("/refresh", RefreshToken)
  .get("/getProfile", authenticate, userController.getProfile)

  .get("/getUsers", authenticate, dashController.getUsers)
  .get("/getallUsers", authenticate, dashController.getAllUsers)

  .get("/getcomments", authenticate, dashController.getComments)
  .delete("/deletecomments", authenticate, dashController.deleteComments)

  .post("/AddUser", authenticate, dashController.AddUser)
  .delete("/DeleteUser/:userProfileId", authenticate, dashController.DeleteUser)

  .patch("/updateprofile", authenticate, dashController.updateProfile)

  .post("/logout", authenticate, userController.logout)

  .post("/addmember", authenticate, dashController.AddFamilyMember)
  .patch("/updatemember", authenticate, dashController.UpdateFamilyMember)

  .get("/members", authenticate, dashController.getMembers)
  .delete("/removemember", authenticate, userController.removeMembers)
  .post("/addpost", authenticate, dashController.AddPosts)
  .get("/posts", authenticate, userController.GetPost)
  .get("/allposts", authenticate, dashController.GetAllPost)
  .get("/posts/:postid", authenticate, userController.GetPostById)
  .delete("/posts/:postid", authenticate, userController.DeletePostById)
  .patch("/posts/:postid", authenticate, dashController.UpdatePostStatus)
  .put("/updateposts/:postid", authenticate, dashController.UpdatePost)
  .put(
    "/change-status/:userid",
    authenticate,
    dashController.changeApproveStatus
  )

  .post("/likepost/:postid", authenticate, userController.LikePost)
  .post(
    "/likecomment/:postid/:commentid/:replyid?",
    authenticate,
    userController.LikeComment
  )

  .post("/addcomment/:postid", authenticate, userController.AddComment)

  .post("/setupappsettings", authenticate, dashController.SetupOnboarding)
  .get("/onboarding", authenticate, userController.getAppOnboarding)

  .patch("/updateappsettings", authenticate, dashController.UpdateOnboarding)
  .delete("/onboarding", authenticate, dashController.deleteOnboarding)

  .post("/Addsecrets", authenticate, dashController.AddSecrets)
  .get("/getsecrets", authenticate, dashController.GetSecrets)
  .patch("/updateappsecrets", authenticate, dashController.UpdateAppSecrets)
  .delete("/appsecrets", authenticate, dashController.deleteAppSecrets)

  .post("/addpagesdata", authenticate, dashController.AddPagesData)

  .get("/getpagesdata", authenticate, dashController.GetPagesData)
  .delete("/page", authenticate, dashController.DeletePagesData)

  .post("/updatepagedata", authenticate, dashController.UpdatePagesData)
  .delete("/deleteUserprofile", dashController.DeleteUserProfile)

  .get("/announcements", authenticate, dashController.GetAnnouncemnets)
  .delete("/announcements", authenticate, dashController.DeleteAnnouncements)
  .get("/dashboard", authenticate, dashController.getDashboardData)
  .post("/announcements", authenticate, dashController.Announcements);

export { router };
