package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UserDao;
import com.cursojava.curso.models.User;
import com.cursojava.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

// Controllers are basically used for manage our page's urls

@RestController // This is an annotation
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/users") // The requests have the method GET for default
    public List<User> getUsers(@RequestHeader(value="Authorization") String token){
        if(!verifyToken(token)) { return null; }
        return userDao.getUsers();
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void delete(@RequestHeader(value="Authorization") String token, @PathVariable Long id){
        if(!verifyToken(token)) { return; }
        userDao.delete(id);
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());

        user.setPassword(hash);

        userDao.register(user);
    }

    private boolean verifyToken(String token) {
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

}
