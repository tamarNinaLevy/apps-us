import { InfoCard } from "../cmps/InfoCard.jsx"

import { makeId } from "../services/util.service.js"

export function Home() {

    const contributers = [
        { id: makeId(), fullName: 'Nadav Botzer', gMail: 'nadavbotzer@gmail.com', gitHubLink: '', profilePhotoSrc: '' },
        { profilePhotoSrc: 'assets/img/contribute-img.png' },
        { id: makeId(), fullName: 'Tamar Levy', gMail: 'tamarlevy2002@gmail.com', gitHubLink: 'https://github.com/tamarNinaLevy', profilePhotoSrc: 'assets/img/tamar-profile.jpg' },
    ]

    const homePageHeader = 'Contributers'

    return <section className="home flex column align-center">
        <h1 className="home-page-header flex row align-center justify-center">{homePageHeader}</h1>
        <div className="contributers-container flex row align-center justify-center">
            {
                contributers.map((contributer) => {
                    return <InfoCard
                        id={contributer.id || ''}
                        key={contributer.id}
                        fullName={contributer.fullName}
                        gMail={contributer.gMail}
                        profilePhotoSrc={contributer.profilePhotoSrc}
                        gitHubLink={contributer.gitHubLink}
                    />
                })
            }
        </div>
    </section>
}