import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/SearchSharp';
import CloseIcon from '@mui/icons-material/CloseSharp';
import TrendMenu from './TrendMenu';
import { Avatar } from '@mui/material';
import { followSuggestions, trends } from '../../utils/mockData';
import './RightPart.css';

function RightPart() {
    const [showNews, setShowNews] = useState(true);
    const [query, setQuery] = useState('');

    const filteredTrends = useMemo(() => {
        if (!query.trim()) return trends;
        return trends.filter((trend) =>
            `${trend.category} ${trend.title}`.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    const headlines = [
        'React social dashboards focus on faster composer and feed interactions',
        'Spring Boot APIs power polished full-stack portfolio projects',
        'Responsive product layouts make mobile timelines feel native',
    ];

    return (
        <aside className='rightpart-container'>
            <div className='w-[80%] mx-auto flex flex-col gap-6'>
                <div className='search-section'>
                    <div className='search-wrapper'>
                        <SearchIcon className='search-icon' />
                        <input
                            type='text'
                            placeholder='Search'
                            className='search-input'
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </div>

                <section className='premium-section'>
                    <h2 className='premium-title'>Subscribe to Premium</h2>
                    <p className='premium-desc'>
                        Unlock longer posts, custom profile styling, creator analytics, and priority replies.
                    </p>
                    <button className='premium-btn'>Subscribe</button>
                </section>

                {showNews && (
                    <section className='news-section'>
                        <div className='news-header'>
                            <h2 className='news-title'>Today&apos;s News</h2>
                            <CloseIcon className='news-close-btn' onClick={() => setShowNews(false)} />
                        </div>

                        <div className='news-list'>
                            {headlines.map((headline, index) => (
                                <article key={headline} className='news-card'>
                                    <h3 className='news-headline'>{headline}</h3>
                                    <div className='news-meta'>
                                        <Avatar sx={{ width: 40, height: 40 }} />
                                        <div className='news-info'>
                                            <p className='news-time'>{index + 2} hours ago</p>
                                            <p className='news-category'>Technology · {3708 + index * 1190} posts</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <section className='trends-section'>
                    <h2 className='trends-title'>What&apos;s happening</h2>
                    <div className='trends-list'>
                        {filteredTrends.map((trend) => (
                            <div key={trend.title} className='trend-item'>
                                <div className='trend-content'>
                                    <p className='trend-category'>{trend.category}</p>
                                    <h3 className='trend-title'>{trend.title}</h3>
                                    <p className='trend-count'>{trend.count}</p>
                                </div>
                                <TrendMenu />
                            </div>
                        ))}
                    </div>
                    <button className='show-more-btn'>Show more</button>
                </section>

                <section className='follow-section'>
                    <h2 className='follow-title'>Who to follow</h2>
                    <div className='follow-list'>
                        {followSuggestions.map((person) => (
                            <article className='follow-card' key={person.id}>
                                <Avatar src={person.avatar} alt={person.name} />
                                <div className='follow-copy'>
                                    <strong>{person.name}</strong>
                                    <span>@{person.username}</span>
                                </div>
                                <button>Follow</button>
                            </article>
                        ))}
                    </div>
                    <button className='show-more-btn'>Show more</button>
                </section>

            </div>
            <footer className='rightpart-footer'>
                <a href='#terms'>Terms of Service</a> |
                <a href='#privacy'>Privacy Policy</a> |
                <a href='#cookies'>Cookies Policy</a> |
                <a href='#accessibility'>Accessibility</a> |
                <a href='#adsinfo'>Ads info</a> |
                <a href='#more'>More</a>

                <span className='footer-copyright'>© 2026 TweetHub Corporation</span>
            </footer>
        </aside>
    );
}

export default RightPart;
