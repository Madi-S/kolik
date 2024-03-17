import { useSelector } from 'react-redux'

const NavCircle = ({ index }) => {
    const currIndex = useSelector(state => state.welcome.currIndex)

    return (
        <div
            data-index={index}
            className={
                index == currIndex
                    ? 'welcome__nav-circle circle-active'
                    : 'welcome__nav-circle'
            }
        ></div>
    )
}

export default NavCircle
