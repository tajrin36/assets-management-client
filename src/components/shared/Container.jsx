// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
    return (
        <div className=' container mx-auto'>
            {children}
        </div>
    );
};

export default Container;