import TaskListPage from '../../page-objects/taskListPage'

const taskList = new TaskListPage();

describe('should be able to add item', () => {
  beforeEach(() => {
    cy
      taskList.visitPage()
  })
  it('Should find text field, input data and add to list ', () => {
    cy
      .get(taskList.textField).type('rice')
      .get(taskList.itemBtn).click()
      .get(taskList.textField).type('oranges')
      .get(taskList.itemBtn).click()
      .get(taskList.textField).type('apples')
      .get(taskList.itemBtn).click()
      .get(taskList.textField).type('bread')
      .get(taskList.itemBtn).click()
  
  })    
})
