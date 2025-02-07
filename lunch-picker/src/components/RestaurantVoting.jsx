import React, { useState, useEffect } from 'react';

const RestaurantVoting = ({ API_BASE_URL }) => {
    const [votingActive, setVotingActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(15 * 60); // 15 minutes
    const [results, setResults] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [updatedRestaurants, setUpdatedRestaurants] = useState([]);

    // Fetch restaurants from the server
    const fetchRestaurants = () => {
        fetch(`${API_BASE_URL}/restaurants`)
            .then(response => response.json())
            .then(data => setUpdatedRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    };

    // Start the voting session
    const startVoting = () => {
        fetch(`${API_BASE_URL}/reset-votes`, { method: 'POST' })
            .then(response => response.json())
            .then(() => {
                setVotingActive(true);
                setRemainingTime(15 * 60); // Reset timer to 15 minutes
                setResults(null); // Clear previous results
                setHasVoted(false); // Reset voting state
                fetchRestaurants(); // Fetch updated restaurants
            })
            .catch(error => console.error('Error resetting votes:', error));
    };

    // End the voting session manually
    const endVoting = () => {
        setVotingActive(false);
        fetch(`${API_BASE_URL}/votes`)
            .then(response => response.json())
            .then(data => setResults(data));
    };

    // Vote for a restaurant
    const voteForRestaurant = (restaurantId) => {
        fetch(`${API_BASE_URL}/vote/${restaurantId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                console.log("vote is done",data)
                if (data.success) {
                    setHasVoted(true);
                    console.log("vote is done2222",data)
                    // Update the vote count locally
                    setUpdatedRestaurants(prevRestaurants =>
                        prevRestaurants.map(r =>
                            r.id === restaurantId
                                ? { ...r, votes: (r.votes || 0) + 1 }
                                : r
                        )
                    );
                }
            })
            .catch(error => console.error('Error voting:', error));
    };

    // Timer for voting
    useEffect(() => {
        if (votingActive && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (remainingTime === 0) {
            endVoting(); // End voting automatically when time is up
        }
    }, [votingActive, remainingTime]);

    // Fetch restaurants when the component mounts
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div style={{ marginBottom: '20px' }}>
            {!votingActive ? (
                <button onClick={startVoting}>Start Voting</button>
            ) : (
                <>
                    <p>
                        Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                    </p>
                    <ul>
                        {updatedRestaurants.map(r => (
                            <li key={r.id}>
                                {r.name} - Votes: {r.votes || 0}
                                <button
                                    onClick={() => voteForRestaurant(r.id)}
                                    disabled={hasVoted}
                                >
                                    Vote
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={endVoting}>End Voting Early</button>
                </>
            )}
            {results && (
                <div>
                    <h3>Voting Results</h3>
                    <ul>
                        {results.map((r, index) => (
                            <li key={r.id}>
                                {index + 1}. {r.name} - Votes: {r.votes || 0}
                            </li>
                        ))}
                    </ul>
                    <h4>Winner: {results[0]?.name}</h4>
                </div>
            )}
        </div>
    );
};

export default RestaurantVoting;