import './card.scss';

const CardComponent = (): JSX.Element => {
    return <>
        <div className='card-parent'>
            <img className='img' alt="resin made of dry flowers" src="https://res.cloudinary.com/nikethkopparthyblog-com/image/upload/v1574062656/nkblog%20pics/whatsapp-01_l5qt3n.png" />
            <div className='details'>
                <div className="tags"></div>
                <div className="heading">A bug on whats app triggered by MP4 files while sharing.</div>
                <div className="desc">
                    This application has a sever threat regarding an mp4. On the other side hackers uses snooping attack on both the devices.
                </div>
                <div className='utils'>
                    <div className='date-updated'>
                        <span className="icon">event</span>
                        <span className="date">16 nov</span>
                    </div>
                    <div className='order'>
                        <span className='icon'>shopping_cart</span>
                        <span className='order-text'>Order</span>
                    </div>
                </div>
            </div>
        </div>
    
    </>
}

export default CardComponent;