const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingLists extends Model {}

ReadingLists.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
},
{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readinglists'
})


module.exports = ReadingLists