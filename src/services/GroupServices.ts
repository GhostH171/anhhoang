import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups";
import { createBatch } from "@pnp/sp/batching";

interface IGetGroupUsersOptions {
  select?: string[];
  expand?: string[];
  filter?: string;
  orderBy?: {
    type: string;
    asc?: boolean;
  };
  top?: number;
}

export default class GroupServices {
  private sp: SPFI;

  public constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx({ pageContext: context.pageContext }));
  }

  public async getGroup(groupName: string) {
    return this.sp.web.siteGroups.getByName(groupName)();
  }

  public async getGroupUsers(
    groupName: string,
    options?: IGetGroupUsersOptions
  ) {
    const api = this.sp.web.siteGroups.getByName(groupName).users;

    if (options) {
      const { select, filter, orderBy, expand, top } = options;

      if (filter) {
        api.filter(filter);
      }

      if (orderBy) {
        api.orderBy(orderBy.type, orderBy.asc || true);
      }

      if (select) {
        api.select(...select);
      }

      if (top) {
        api.top(top);
      }

      if (expand) {
        api.expand(...expand);
      }
    }

    return api();
  }

  public async addUsers(groupName: string, users: string[]) {
    const group = this.sp.web.siteGroups.getByName(groupName);
    const [batchedListBehavior, execute] = createBatch(group);

    group.using(batchedListBehavior);

    users.forEach((loginName) => {
      group.users.add(loginName);
    });

    return execute();
  }

  public async removeUsers(groupName: string, users: string[]) {
    const group = this.sp.web.siteGroups.getByName(groupName);
    const [batchedListBehavior, execute] = createBatch(group);

    group.using(batchedListBehavior);

    users.forEach((loginName) => {
      group.users.removeByLoginName(loginName);
    });

    return execute();
  }
}
