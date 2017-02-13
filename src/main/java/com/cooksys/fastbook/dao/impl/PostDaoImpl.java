package com.cooksys.fastbook.dao.impl;

import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cooksys.fastbook.controllers.GroupController;
import com.cooksys.fastbook.controllers.UserController;
import com.cooksys.fastbook.dao.PostDao;
import com.cooksys.fastbook.models.Group;
import com.cooksys.fastbook.models.Post;
import com.cooksys.fastbook.models.PostWithLikeData;
import com.cooksys.fastbook.models.User;

@Repository
@Transactional
public class PostDaoImpl implements PostDao {
	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	UserController userController;
	@Autowired
	GroupController groupController;

	private Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Post> index() {
		Session session = getSession();
		return session.createQuery("from Post order by id desc").list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PostWithLikeData> getPostsForUser(Integer userId, Integer loggedInId) {
		Session session = sessionFactory.getCurrentSession();
		
		String hql = "select new com.cooksys.fastbook.models.PostWithLikeData(p, count(p.id), "
				+ "CASE l.user.id WHEN :loggedInId THEN true "
				+ "ELSE false END) "
				+ "from User u "
				+ "inner join u.posts p "
				+ "left join p.likes l "
				+ "where u.id = :userId "
				+ "group by p.id "
				+ "order by p.timestamp desc";

		return session
				.createQuery(hql)
				.setParameter("userId", userId)
				.setParameter("loggedInId", loggedInId)
				.list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PostWithLikeData> getPostsForGroup(Integer groupId, Integer loggedInId) {
		Session session = sessionFactory.getCurrentSession();
		
		String hql = "select new com.cooksys.fastbook.models.PostWithLikeData(p, count(p.id), "
				+ "CASE l.user.id WHEN :loggedInId THEN true "
				+ "ELSE false END) "
				+ "from Group g "
				+ "inner join g.posts p "
				+ "left join p.likes l "
				+ "where g.id = :groupId "
				+ "group by p.id "
				+ "order by p.timestamp desc";

		return session
				.createQuery(hql)
				.setParameter("groupId", groupId)
				.setParameter("loggedInId", loggedInId)
				.list();
	}

	@Override
	public Post addPostToUser(Integer userId, Post post) {
		Session session = sessionFactory.getCurrentSession();

		User userWall = new User();
		userWall = userController.getUser(userId);

		Set<User> users = post.getUsers();
		users.add(userWall);
		post.setUsers(users);

		session.save(post);
		
		return post;
	}

	@Override
	public Post addPostToGroup(Integer groupId, Post post) {
		Session session = sessionFactory.getCurrentSession();

		Group groupWall = groupController.getGroup(groupId);

		Set<Group> groups = post.getGroups();
		groups.add(groupWall);
		post.setGroups(groups);

		session.save(post);

		return post;
	}

}
