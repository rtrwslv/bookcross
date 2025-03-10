import styles from "./styles.module.css";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
export const Calendar = () => {
    const [date, setDate] = useState()
    const [active, setActive] = useState(false)

    const takeBook = () =>{
        alert("Вы взяли книгу")
    }
    
    useEffect(() => {
        if (date){
            setActive(true)
        }
        else{
            setActive(false)
        }
    }, [date])


    return (
        <>
        <DatePicker className={styles.datePicker} onChange={setDate} placeholder="Выберите дату" format='DD/MM/YYYY'/>
        <div className={active ? styles.button : styles.buttonDisabled} onClick={takeBook}>Взять книгу</div>
        </>
    )
}