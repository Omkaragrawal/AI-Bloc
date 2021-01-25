from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test@arc24.com'
        password = 'Password123'
        username = 'test'
        user = get_user_model().objects.create_user(
			email=email,
			password=password,
            username=username
		)

        self.assertEqual(user.email, email)
        self.assertEqual(user.username, username)
        self.assertTrue(user.check_password(password))
    
    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@ARC24.com'
        user = get_user_model().objects.create_user(email=email, password='test123', username='test')
        
        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(TypeError):
            get_user_model().objects.create_user(email=None, password='test123', username='test')

    def test_new_user_invalid_username(self):
        """Test creating user with no username raises error"""
        with self.assertRaises(TypeError):
            get_user_model().objects.create_user(email='test@arc24.com', password='test123', username=None)   
    
    def test_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@arc2.com',
            'test123',
            'test'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)