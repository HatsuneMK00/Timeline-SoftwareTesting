package com.ceej.controller;

import com.ceej.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.awt.dnd.DropTarget;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserControllerTest {

    DataBaseUtility mock_dao;
    User user = new User();
    UserController userController = new UserController(mock_dao);

    @BeforeEach
    public void mockSetup() {
        mock_dao = mock(DataBaseUtility.class);
    }

    @Test
    @Disabled
    @DisplayName("InputUserName: UserId不能为空")
    public void UserName_input_should_should_not_be_null() {
        when(mock_dao.isUserExisted(null)).thenReturn(false);
    }

    @Test
    @Disabled
    @DisplayName("InputUserName: 输入UserId应该与返回的姓名对应")
    public void UserName_should_correspond_to_the_name() {
        user = userController.getUsername("1");
        assertAll(
                () -> assertEquals(user.getNickname(), "Alia"),
                () -> assertEquals(user.getUserID(), "1")
        );
        user = userController.getUsername("2");
        assertAll(
                () -> assertEquals(user.getNickname(), "Ben"),
                () -> assertEquals(user.getUserID(), "2")
        );
        user = userController.getUsername("3");
        assertAll(
                () -> assertEquals(user.getNickname(), "Ceej"),
                () -> assertEquals(user.getUserID(), "3")
        );


        user = userController.getUsername("12");
        assertAll(
                () -> assertEquals(user.getNickname(), "nuke"),
                () -> assertEquals(user.getUserID(), "12")
        );

        user = userController.getUsername("11");
        assertAll(
                () -> assertEquals(user.getNickname(), "poke"),
                () -> assertEquals(user.getUserID(), "11")
        );
    }
}