import './Card.css'

export default function Card({id, title, description}) {
    return(
        <div className = 'card'>
            <div className= "head">
                <div className= "title">
                    <h3>{title}</h3>
                </div>
            </div>

            <div className= "description">
                <p>{description}</p>
            </div>
            
        </div>
    )
}