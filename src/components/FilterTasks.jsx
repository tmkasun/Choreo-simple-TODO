import { TASK_STATUS } from '../data/hooks/tasks';
import '../styles/FilterTasks.css'
export default function FilterTasks(props) {
    const { showByStatus, setShowByStatus } = props;
    return (
        <div className="filter-container">
            <label htmlFor="filter-by-status">Show:</label>
            <select defaultValue='all' value={showByStatus} onChange={(e) => setShowByStatus(e.target.value)} name="filter-by-status" id="filter-by-status">
                <option value={TASK_STATUS.ALL}>All</option>
                <option value={TASK_STATUS.COMPLETED}>Completed</option>
                <option value={TASK_STATUS.INPROGRSS}>In Progress</option>
                <option value={TASK_STATUS.OPEN}>Open</option>
            </select>
        </div>
    )
}