import useUser from '../../data/hooks/user';
import '../../styles/Header/Header.css';
import AvatarMenu from '../AvatarMenu';
import FilterTasks from '../FilterTasks';
import SearchInput from '../SearchInput';

export default function Header(props) {
    const user = useUser();
    return (
        <div className='header-container'>
            <div className='header-left'>
                <SearchInput />
                <FilterTasks />
            </div>

            <div className='header-right'>
                <AvatarMenu />
            </div>

        </div>)
}