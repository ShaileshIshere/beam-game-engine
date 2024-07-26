import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { BeamPoints } from './BeamPoints';
import { grey } from '@mui/material/colors';
import { LightTooltip } from './Hovers';
import { SearchBar } from './SearchBar';
import { RenderName } from './RenderName';

export const SubAppBar = ({ setView }) => {
    
    return (
        <div className="sm:px-40 px-2 bg-red-600 bg-opacity-70 w-full sm:h-16 h-8 flex items-center justify-between text-slate-200 py-7">
            <div className='flex items-center justify-center'>
                <div className='cursor-pointer' onClick={() => setView('purchased')}>
                    <LightTooltip title="YOUR GAMES" arrow>
                        <BookmarkSharpIcon sx={{ color: grey[300], fontSize: '2em' }} />
                    </LightTooltip>
                </div>
                <div className='cursor-pointer ml-1 -mr-2' onClick={() => setView('all')}>
                    <LightTooltip title="HOME" arrow>
                        <HomeSharpIcon sx={{ color: grey[300], fontSize: '2em' }} />
                    </LightTooltip>
                </div>
                <div className='hidden sm:flex'>
                    <BeamPoints />
                </div>
            </div>
            <SearchBar />
            <RenderName />
        </div>
    );
}