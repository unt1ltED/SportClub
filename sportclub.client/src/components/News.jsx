// src/components/News.js
import React from 'react';
import '../styles/News.css';

const News = () => {
    const newsArticles = [
        {
            title: "New Yoga Classes Starting Soon!",
            date: "October 1, 2024",
            content: "Join our new yoga classes designed for all skill levels. Reserve your spot today!"
        },
        {
            title: "Annual Fitness Challenge!",
            date: "September 15, 2024",
            content: "Sign up for our annual fitness challenge and compete for amazing prizes!"
        },
        {
            title: "Healthy Eating Workshop",
            date: "August 20, 2024",
            content: "Learn how to create nutritious meals with our expert nutritionists. Don't miss out!"
        },
    ];

    return (
        <section className="news">
            <h2>Latest News</h2>
            <div className="news-list">
                {newsArticles.map((article, index) => (
                    <div className="news-item" key={index}>
                        <h3>{article.title}</h3>
                        <p className="date">{article.date}</p>
                        <p>{article.content}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default News;
