import { Link } from 'react-router-dom'
import { ActivityCard } from '../activityCard/ActivityCards'
import Styles from './HomeActivityStyle.module.css'

export const HomeActivity = () => {
const transferencias = [
    {
        id: 1,
        userId: "Pablo Merino",
        senderId: "Pablo Merino",
        receiverId: "Dafni Vamvakianos",
        amountofMoney: 1200.0,
        date: "2025-03-07"
    },
    {
        id: 2,
        userId: "Pablo Merino",
        senderId: "Dafni Vamvakianos",
        receiverid: "Pablo Merino",
        amountofMoney: 100.0,
        date: "2025-03-07"
    },
    {
        id: 3,
        userId: "Pablo Merino",
        senderId: "Pablo Merino",
        receiverId: "Dafni Vamvakianos",
        amountofMoney: 200.0,
        date: "2025-03-07"
    },
    {
        id: 4,
        userId: "Pablo Merino",
        senderId: "Pablo Merino",
        receiverId: "Dafni Vamvakianos",
        amountofMoney: 300.0,
        date: "2025-03-07"
    },
    {
        id: 5,
        userId: "Pablo Merino",
        senderId: "Dafni Vamvakianos",
        receiverId: "Pablo Merino",
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
            <Link to="/all-transferences" className={Styles.linkToTransferences}><p className={Styles.seeMoreBtn}>Ver Mas</p></Link>
        </section>
    )
}