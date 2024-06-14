import '../output.css';
import { Link } from 'react-router-dom';

export default function Root() {
    return (
        <div className='bg-stone-900'>
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="min-h-32 text-6xl font-bold bg-gradient-to-br from-purple-400 to-red-400 bg-clip-text text-transparent">Democratic Spotify</h1>
                        <p className="py-6 text-xl">Queue up songs and vote on them. Upvote songs to get them to the top of the Queue.</p>
                        <Link to='/connect'>
                           <button className="btn btn-primary text-white">Get Started</button> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}