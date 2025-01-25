export function InfoCard({ id, fullName, gMail, profilePhotoSrc, gitHubLink }) {

    const visitTxt = 'view profile on gitHub'

    return (
        id ? <div className="info-main-container flex column align-center">
            <img className='photo' src={profilePhotoSrc || 'assets/img/profile.png'} alt="" />
            <div className="info-details-container flex column align-center justify-center">
                <span className="hover">{fullName}</span>
                <span className="hover">{gMail}</span>
                <a className="hover link" href={gitHubLink}>{visitTxt}</a>
            </div>
        </div> :
            <img className="cntrbtr" src={profilePhotoSrc} alt="" />
    )
}