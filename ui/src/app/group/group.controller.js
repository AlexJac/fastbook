export default GroupController

GroupController.$inject = [
  'groupService',
  'userService',
  'accessService',
  '$state',
  '$scope',
  '$mdDialog',
  '$log',
  'chosenGroup',
  'groupMembers',
  'posts'
];

function GroupController(
  groupService,
  userService,
  accessService,
  $state,
  $scope,
  $mdDialog,
  $log,
  chosenGroup,
  groupMembers,
  posts
) {

  this.groupService = groupService;
  this.profileGroup = chosenGroup;
  this.groupMembers = groupMembers;
  this.posts = posts;
  this.groupPostObject = groupService.groupPost;
  this.loggedInUser = accessService.currentUser;

  this.post = () => {
    $log.debug(this.groupPostObject.text)
    $scope.date = new Date();
    this.groupPostObject.timestamp = $scope.date;
    this.groupPostObject.user = this.loggedInUser;
    $log.debug(this.groupPostObject)
    $log.debug(this.profileGroup.id)
      return groupService
      .postToGroup(this.profileGroup.id, this.groupPostObject)
      .then($state.go($state.current, {}, {reload: true}));
    };

  this.joinGroup = () => {
    groupService
      .joinGroup(this.profileGroup.id, this.loggedInUser)
      };
  }
