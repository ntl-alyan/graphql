import React from 'react'

export default function PanelHeading(props) {
    return (
        <div className="panel-heading panel-heading-div custom-bg-color rounded-top">
            <h6 className="panel-title text-white font-16 weight-400">
                {props.text}
            </h6>
        </div>
    )
}
