import React, { useState } from 'react';

const ReviewForm = ({ flavorId, onAddReview }) => {
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            id: Date.now(),
            author,
            rating,
            comment,
        };
        onAddReview(flavorId, review);
        setAuthor('');
        setRating(5);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Leave a Review</h2>
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
            />
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your review"
                required
            />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
