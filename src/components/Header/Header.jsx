import useUser from '../../data/hooks/user';
import '../../styles/Header/Header.css';
import AvatarMenu from '../AvatarMenu';
import FilterTasks from '../FilterTasks';
import SearchInput from '../SearchInput';

export default function Header(props) {
    const { searchText, setSearchText, showByStatus, setShowByStatus } = props;
    return (
        <div className='header-container'>
            <div className='header-left'>
                <SearchInput searchText={searchText} setSearchText={setSearchText} />
                <FilterTasks showByStatus={showByStatus} setShowByStatus={setShowByStatus} />
            </div>

            <div className='header-right'>
                <AvatarMenu />
            </div>
        </div>)
}