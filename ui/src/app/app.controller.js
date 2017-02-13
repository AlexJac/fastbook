export default AppController

AppController.$inject = ['accessService'];

function AppController(accessService) {
  this.accessService = accessService;
}
