import Link from 'next/link'
import {useState} from 'react'

function dropdown() {
    const [toggle, setToggle] = useState(true)

    return (
        <div>
            
        </div>
    )
}

export default dropdown

function toggleBtn(toggle, setToggle) {
    if (toggle === true) {
        setToggle(false)
    }
    else{
        setToggle(true)
    }
}








