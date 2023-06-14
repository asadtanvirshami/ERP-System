import React from 'react'

type Props = {
    onClick : any,
    title :string
}

const Tabs = ({title, onClick}: Props) => {
  return (
    <div>
        <button onClick={onClick} className=''>
            {title}
        </button>
    </div>
  )
}

export default Tabs