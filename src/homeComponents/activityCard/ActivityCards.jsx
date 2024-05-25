import Styles from './ActivityCardStyle.module.css'

export const ActivityCard = ({id, senderId, receiverId, amountofMoney, date}) => {

    return (
        <div>
            <p>{id}</p>
            <p>{senderId}</p>
            <p>{receiverId}</p>
            <p>{amountofMoney}</p>
            <p>{date}</p>
            <p>-----------------------------</p>
        </div>
    )
}