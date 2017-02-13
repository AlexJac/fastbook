import GroupController from './group.controller'
import groupTemplateUrl from './group.template'

import GroupCreateController from './groupCreate.controller'
import groupCreateTemplateUrl from './group-create.template'

export default {

  group: {
    url: '/groups/{groupId}',
    templateUrl: groupTemplateUrl,
    controller: GroupController,
    controllerAs: '$group',
    resolve: {
      chosenGroup: ['groupService', '$stateParams', function(groupService, $stateParams) {
        return groupService.getGroup($stateParams.groupId);
      }],
      groupMembers: ['groupService', '$stateParams', function (groupService, $stateParams) {
        return groupService.getUsersInGroup($stateParams.groupId);
      }],
      posts: ['groupService', '$stateParams', function (groupService, $stateParams) {
        return groupService.getGroupPosts($stateParams.groupId);
      }]
      //groupOwner: ['groupService', '$stateParams', function (groupService, $stateParams) {
      //  return groupService.getGroupsOwner($stateParams.groupId);
    //  }]
    },
    data: {
      loggedIn: true
    }
  },

  groupCreate: {
    url: '/groups/create',
    templateUrl: groupCreateTemplateUrl,
    controller: GroupCreateController,
    controllerAs: '$groupCreate',
    data: {
      loggedIn: true
    }
  }

}
