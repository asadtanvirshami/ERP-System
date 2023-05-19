import React from 'react'
import { BeatLoader } from 'react-spinners'

type Props = {}

const CardLoader = (props: Props) => {
  return (
    <div className="flex p-4 flex-col h-full justify-center items-center rounded-lg shadow-lg">
    <div className="flex justify-center items-cente">
      <div className="mx-auto">
        <BeatLoader />
      </div>
    </div>
  </div>
  )
}

export default CardLoader