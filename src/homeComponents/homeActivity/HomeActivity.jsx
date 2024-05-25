import { ActivityCard } from '../activityCard/ActivityCards'
import Styles from './HomeActivityStyle.module.css'

export const HomeActivity = () => {
const transferencias = [
    {
        id: 1,
        senderId: 1,
        receiverid: 2,
        amountofMoney: 1200.0,
        date: "2025-03-07"
    },
    {
        id: 2,
        senderId: 1,
        receiverid: 2,
        amountofMoney: 100.0,
        date: "2025-03-07"
    },
    {
        id: 3,
        senderId: 1,
        receiverid: 2,
        amountofMoney: 200.0,
        date: "2025-03-07"
    },
    {
        id: 4,
        senderId: 1,
        receiverId: 2,
        amountofMoney: 300.0,
        date: "2025-03-07"
    },
    {
        id: 5,
        senderId: 1,
        receiverId: 2,
        amountofMoney: 400.0,
        date: "2025-03-07"
    }
]
    return(
        <section className={Styles.transferences}>
            {
                transferencias.map((transferencia, index) => {
                    return(
                        <ActivityCard {...transferencia} key={index}/>
                    )
                })
            }
        </section>
    )
}