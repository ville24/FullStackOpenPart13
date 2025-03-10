const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readinglists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'readings' })

module.exports = {
  Blog, User, ReadingLists
}
