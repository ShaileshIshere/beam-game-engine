export const Header = ({ label }) => {
    return (
        <div className="font-bold text-3xl text-white py-10 text-center mb-10 cursor-default">
            { label.toUpperCase() }
        </div>
    );
}