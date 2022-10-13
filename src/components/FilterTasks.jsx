import '../styles/FilterTasks.css'
export default function FilterTasks(params) {
    return (
        <div className="filter-container">
            <label htmlFor="filter-by-status">Show:</label>
            <select defaultValue='all' name="filter-by-status" id="filter-by-status">
                <option value="all">All</option>
                <option value="bronze">Completed</option>
                <option value="silver">Inprogress</option>
                <option value="Gold">Started</option>
            </select>
        </div>
    )
}