interface IRankProps {
    userName: string,
    userRank: number
}

const Rank = ({userName, userRank}: IRankProps) => {
    return (
        <div className='center ma'>
            <h3>{`Hello ${userName}, heres the amount of times you submitted a thing: ${userRank}`}</h3>
            <p>Drop a link with faces in it to detect where the faces are at!!!</p>
        </div>
    )
}

export default Rank;