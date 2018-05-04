package cn.jts.t.service;

import cn.jts.t.entity.User;

import java.util.List;

public interface UserService {
    public int save(User user);

    public User get(int id);

    public List<User> getAll();

    public int delUser(int id);

    public User getUserByUP(User user);

    public int updatePasswordByUserId(User user);
}
