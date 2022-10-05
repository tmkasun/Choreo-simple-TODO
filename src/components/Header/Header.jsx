import useUser from '../../data/hooks/user';
import '../../styles/Header/Header.css';
import AvatarMenu from '../AvatarMenu';
import SearchInput from '../SearchInput';

export default function Header(props) {
    const user = useUser();
    return (
    <div className='header-container'>
        <SearchInput />
        <AvatarMenu />
    </div>)
}