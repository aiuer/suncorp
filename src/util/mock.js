import Mock from 'mockjs'

Mock.mock('api/log', (req, res) => {
  return {
    data: ['a', 'b']
  }
})
