import '../styles/FilterTasks.css'
export default function FilterTasks(params) {
    return (
        <div className="filter-container">
            <label htmlFor="filter-by-status">Show:</label>
            <select name="filter-by-status" id="filter-by-status">
                <option value="free" selected>All</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="Gold">Gold</option>
            </select>
        </div>
    )
}