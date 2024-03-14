import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import { join } from "path";
import { FusionAuthClient, GroupMember } from "@fusionauth/typescript-client";

config({
  path: join(process.cwd(), ".env"),
});

console.log(
  " host:           ",
  process.env.FUSIONAUTH_HOST,
  "\n\r",
  "api key:        ",
  process.env.FUSIONAUTH_API_KEY,
  "\n\r",
  "tenant id:      ",
  process.env.FUSIONAUTH_TENANT_ID,
  "\n\r",
  "application id: ",
  process.env.FUSIONAUTH_APPLICATION_ID
);

const app = express();
const fusionAuthClient = new FusionAuthClient(
  process.env.FUSIONAUTH_API_KEY!,
  process.env.FUSIONAUTH_HOST!,
  process.env.FUSIONAUTH_TENANT_ID!
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  res.status(200).send({ status: "healthy" });
});

app.post("/register", async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const groups: FusionAuthUserGroup[] = [];
  const applicationId = process.env.FUSIONAUTH_APPLICATION_ID;
  const memberships = getMemberships(groups);

  console.log("fusionAuthClient.host:     ", fusionAuthClient.host);
  console.log("fusionAuthClient.apiKey:   ", fusionAuthClient.apiKey);
  console.log("fusionAuthClient.tenantId: ", fusionAuthClient.tenantId);

  try {
    const {
      response: { user },
      exception,
    } = await fusionAuthClient.register("", {
      sendSetPasswordEmail: true,
      registration: {
        applicationId,
      },
      user: {
        email,
        lastName,
        firstName,
        memberships,
        fullName: `${firstName} ${lastName}`,
        data: {},
      },
    });

    if (exception) {
      console.debug("EEEEEEEEEEEE");
      console.debug(exception);
      res.send(exception);
      return;
    }

    if (!user) {
      res.send({ message: "no user" });
      return;
    }

    res.send({ id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.listen(3000);

console.info("Server is running on http://localhost:3000");

enum FusionAuthUserGroup {
  MyGroup = "MyGroup",
}

function getMemberships(groups: FusionAuthUserGroup[]): GroupMember[] {
  const memberships: GroupMember[] = [];

  if (groups.includes(FusionAuthUserGroup.MyGroup)) {
    memberships.push({
      groupId: process.env.FUSIONAUTH_MY_GROUP_ID,
    });
  }

  return memberships;
}
