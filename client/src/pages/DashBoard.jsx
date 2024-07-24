import React from 'react';
import axios from 'axios';
import { AppBar } from "../components/AppBar";
import { AllGames } from '../components/AllGames';
import { useState, useEffect } from 'react';

export const DashBoard = () => {
    const [view, setView] = useState('all');
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); // Log the token to verify it's being retrieved

                if (!token) {
                    console.error('No token found, redirecting to login...');
                    // Redirect to login or handle the absence of token appropriately
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                let response;
                if (view === 'purchased') {
                    response = await axios.get('http://localhost:3000/api/games/purchased', config);
                    console.log("all purchased games response: ", response);
                    setGames(response.data.purchasedGames || []);
                } 
                // else if (view === 'wishlist') {
                //     response = await axios.post('/http://localhost:3000/api/games/wishlist', {
                //         headers: {
                //             Authorization: `Bearer ${token}`
                //         }
                //     });
                //     setGames(response.data.cartedGames);
                // } 
                else {
                    // Default view is all games
                    response = await axios.get('http://localhost:3000/api/games/all', config);
                    console.log("all games response: ", response);
                    setGames(response.data || []);
                }
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, [view]);

    return (
        <div className="h-max bg-neutral-900">
            <AppBar setView={ setView }/>
            <div className='pt-24'>
                <AllGames games={ games }/>
            </div>
        </div>
    );
};