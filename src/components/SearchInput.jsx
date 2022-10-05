import '../styles/Header/SearchInput.css';

export default function SearchInput(props) {
    return (
        <div className='search-container'>
            <input type='search' placeholder='Search tasks' aria-label='Search tasks' />
        </div>
    )
}