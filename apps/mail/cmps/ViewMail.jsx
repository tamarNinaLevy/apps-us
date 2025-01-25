const { useEffect, useState } = React

const { useNavigate, useParams } = ReactRouterDOM

import { WhiteBox } from "./WhiteBox.jsx"

import { formatDate } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function ViewMail() {

    const { mailId } = useParams()
    const navigate = useNavigate()

    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    function viewList() {
        navigate(`/mail`)
    }

    return <WhiteBox>
        {
            mail && (
                <React.Fragment>
                    <div className="buttons">
                        <input type="button" value="go back" onClick={viewList} />
                    </div>
                    <div className="headers">
                        <h1>{mail.subject}</h1>
                        <div className="from-to-container">
                            <span className="from">{mail.from}</span>
                            <div className="sentAt-to-container flex row align-center">
                                <span className="to">{mail.to}</span>
                                <span className="to">{formatDate(mail.sentAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="content-mail-container">
                        <span>{mail.body}</span>
                    </div>
                </React.Fragment>
            )
        }
    </WhiteBox>
}