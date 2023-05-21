import { useState } from "react"

function useSendEmail() {

    const [timeOfLastEmail, setTimeOfLastEmail] = useState(null)

    /**
   * Send email informing that new message sent
   * Include an interval of 30 mins where emails are blocked after each
   */
    async function sendEmail(email) {

        const currTimeinSeconds = Math.floor(Date.now() / 1000)
        const newEmailThreshold = timeOfLastEmail + 1800

        if (currTimeinSeconds < newEmailThreshold) return

        try {
            await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    type: email.type,
                    name: email.name,
                    email: email.email,
                    subject: email.subject,
                    picture: email.picture,
                    header: email.header,
                    message: email.message,
                    link: email.link,
                }),
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            }).then((res) => {
                if (!res.ok) throw new Error("Failed to send message");
                return res.json();
            })
        } catch (error) {
            console.log("send email err: ", error)
        }
        setTimeOfLastEmail(Math.floor(Date.now() / 1000))
    };

    return {
        sendEmail: sendEmail
    }
}

export default useSendEmail