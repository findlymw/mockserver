package cn.jts.t.service;

import cn.jts.t.entity.User;

import java.util.List;

public interface UserService {
    int save(User user);

    User get(int id);

    List<User> getAll();

    int delUser(int id);

    User getUserByUP(User user);

    int updatePasswordByUserId(User user);
}
