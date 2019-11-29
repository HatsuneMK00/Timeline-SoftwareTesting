package com.ceej.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.junit.jupiter.api.Assertions.*;
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ArticleTest {
    private Article article;

    @BeforeEach
    public void init(){
        article = new Article();
    }

    @Test
    @DisplayName("设置时间为now")
    public void set_article_to_now(){
        article.setTimeStamp("2019-10-31 14:32:00.0");
        assertEquals("刚刚", article.getTimeStamp());
    }

    @Test
    @DisplayName("设置时间为5分钟前")
    public void set_article_to_five_min_before(){
        article.setTimeStamp("2019-10-31 14:31:00.0");
        assertEquals("5分钟前", article.getTimeStamp());
    }

    @Test
    @DisplayName("设置时间为5小时前")
    public void set_article_to_five_hours_before(){
        article.setTimeStamp("2019-10-31 09:44:00.0");
        assertEquals("5小时前", article.getTimeStamp());
    }

    @Test
    @DisplayName("设置时间为一天前")
    public void set_article_to_one_day_before(){
        article.setTimeStamp("2019-10-30 14:31:00.0");
        assertEquals("昨天 14:31", article.getTimeStamp());
    }

    @Test
    @DisplayName("设置时间为一个月前")
    public void set_article_to_one_month_before(){
        article.setTimeStamp("2019-09-30 14:31:00.0");
        assertEquals("9月30日14时", article.getTimeStamp());
    }

    @Test
    @DisplayName("设置时间为一年前")
    public void set_article_to_one_year_before(){
        article.setTimeStamp("2018-09-30 14:31:00.0");
        assertEquals("2018年9月30日", article.getTimeStamp());
    }
}