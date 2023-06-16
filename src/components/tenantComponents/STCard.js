import React from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const ServiceTicketCard = (props) => {
    const content = props.images // list of images for this particular service ticket
    return (
    <Slider>
	{content.map((item, index) => (
		<div
			key={index}
			style={{ background: `url('${item}') no-repeat center center` }}
		>
			<div className="center">
				{/* <h1>{item.title}</h1>
				<p>{item.description}</p>
				<button>{item.button}</button> */}
			</div>
		</div>
	))}
    </Slider>
    )
    
}