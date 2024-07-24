import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
// import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { BeamPoints } from './BeamPoints';
import { grey } from '@mui/material/colors';
import { LightTooltip } from './Hovers';
import { SearchBar } from './SearchBar';
import { RenderName } from './RenderName';

export const SubAppBar = ({ setView }) => {
    
    return (
        <div className="px-40 bg-red-600 bg-opacity-70 w-full h-16 flex items-center justify-between text-slate-200 py-7">
            <div className='flex items-center justify-center'>
                <div className='cursor-pointer' onClick={() => setView('purchased')}>
                    <LightTooltip title="YOUR GAMES" arrow>
                        <BookmarkSharpIcon sx={{ color: grey[300] }} fontSize='large'/>
                    </LightTooltip>
                </div>
                {/* <div className='cursor-pointer mx-3' onClick={() => setView('wishlist')}>
                    <LightTooltip title="CART" arrow>
                        <ShoppingCartSharpIcon sx={{ color: grey[300] }} fontSize='large'/>
                    </LightTooltip>
                </div> */}
                <BeamPoints />
            </div>
            <SearchBar />
            <RenderName />
        </div>
    );
}