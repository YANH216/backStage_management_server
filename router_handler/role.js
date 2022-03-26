const roleModel = require('../models/role')

// 添加角色
exports.addRole = (req, res) => {
  const { roleName } = req.body
  roleModel.create({ name: roleName })
    .then(role => {
      res.send({ status: 0, data: role })
    })
    .catch(err => {
      console.error('添加角色异常', err);
      res.cc('添加角色异常，请重新尝试')
    })
}

// 获取角色列表
exports.getRoleList = (req, res) => {
  roleModel.find()
    .then(roles => {
      res.send({ status: 0, data: roles })
    })
    .catch(err => {
      console.error('获取角色列表异常', err);
      res.cc('更新角色列表异常，请重新尝试')
    })
}

// 更新角色(设置权限)
exports.roleUpdate = (req, res) => {
  const role = req.body
  role.auth_time = Date.now()
  roleModel.findOneAndUpdate({ _id: role._id }, role)
    .then(preRole => {
      res.send({ status: 0, data: { ...preRole._doc, ...role } })
    })
    .catch(err => {
      console.error('更新角色异常', err);
      res.cc('更新角色异常，请重新尝试')
    })
}