import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { BeamPoints } from './BeamPoints';
import { grey } from '@mui/material/colors';
import { LightTooltip } from './Hovers';
import { SearchBar } from './SearchBar';

export const SubAppBar = ({ name }) => {
    return (
        <>
            <div className="bg-red-600 bg-opacity-70 w-full h-16 flex items-center justify-between text-slate-200 px-8 py-7">
                <div className='flex items-center justify-center'>
                    <div className='cursor-pointer'>
                        <LightTooltip title="YOUR GAMES" arrow>
                            <BookmarkSharpIcon sx={{ color: grey[300] }} fontSize='large'/>
                        </LightTooltip>
                        <LightTooltip title="CART" arrow>
                            <ShoppingCartSharpIcon sx={{ color: grey[300] }} fontSize='large' className='mx-3'/>
                        </LightTooltip> 
                    </div>
                    <BeamPoints balance={234454}/>
                </div>
                <SearchBar />
                <div className="flex">
                    <div className="cursor-default flex flex-col justify-center mr-3 text-lg subpixel-antialiased font-normal tracking-tight">
                        hey there,
                    </div>
                    <LightTooltip title={ name.toUpperCase() } arrow>
                        <div className="cursor-pointer bg-zinc-900 h-12 w-12 flex justify-center rounded-full">
                            <div className="flex flex-col justify-center h-full text-2xl font-bold">
                                { name ? name.toUpperCase()[0] : "" }
                            </div>
                        </div>
                    </LightTooltip>
                </div>
            </div>
        </>
        
    );
}