import React from "react";

export { default as header } from "./header";
import "cloudgov-style/img/favicon.ico";

import * as homePage from "./home_page";

export { homePage };

import InfoLogs from "dashboard/components/info_logs";

export const lang = "en-US";

export const config = {
  footer: {
    author_note: <span>A United States government platform</span>,
    code_note: (
      <a href="https://cloud.gov/docs/ops/repos/">
        Open source and in the public domain
      </a>
    ),
    disclaimer_note: (
      <a href="https://18f.gsa.gov/vulnerability-disclosure-policy/">
        Vulnerability disclosure policy
      </a>
    ),
    links: [
      {
        text: "cloud.gov home",
        url: "https://cloud.gov"
      },
      {
        text: "Get help for customer issues",
        url: "https://cloud.gov/docs/help/#support-for-people-who-use-cloud-gov"
      },
      {
        text: "Built and maintained by 18F",
        url: "https://18f.gsa.gov/"
      }
    ]
  },
  docs: {
    cli: "https://cloud.gov/docs/getting-started/setup/",
    concepts_roles: "https://docs.cloudfoundry.org/concepts/roles.html",
    concepts_spaces: "https://cloud.gov/docs/getting-started/concepts/",
    deploying_apps: "https://cloud.gov/docs/getting-started/your-first-deploy/",
    use: "https://cloud.gov/overview/overview/using-cloudgov-paas/",
    invite_user: "https://cloud.gov/docs/apps/managing-teammates/",
    roles:
      "https://cloud.gov/docs/apps/managing-teammates/#give-roles-to-a-teammate",
    managed_services: "https://cloud.gov/docs/apps/managed-services/",
    status: "https://cloudgov.statuspage.io/",
    contact: "https://cloud.gov/docs/help/"
  },
  snippets: {
    logs: InfoLogs
  },
  github: {
    url: "https://github.com/18F/cg-dashboard"
  },
  platform: {
    name: "cloud.gov",
    api_host: "api.fr.cloud.gov",
    logs: {
      name: "logs.fr.cloud.gov",
      url: "https://logs.fr.cloud.gov"
    },
    grafana: {
      name: "",
      url: ""
    }
  }
};
