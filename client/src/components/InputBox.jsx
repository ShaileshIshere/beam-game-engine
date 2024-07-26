export const InputBox = ({ onChange, label }) => {
    return (
        <div className="flex justify-center">
            <input onChange={onChange} type="text" placeholder={ label.toUpperCase() } className="w-11/12 text-center font-semibold px-3 py-2 mb-5 rounded-full" />           
        </div>
    );
}