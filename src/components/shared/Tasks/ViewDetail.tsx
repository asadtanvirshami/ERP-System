import React, { Fragment } from 'react'

type Props = {
    state:any
}

const ViewDetail = ({state}: Props) => {
  return (
    <Fragment>
        {state.map((e,i)=>{
            return (
                <div>
                {e.email}
            </div>
            )
        })}
    </Fragment>
  )
}

export default ViewDetail