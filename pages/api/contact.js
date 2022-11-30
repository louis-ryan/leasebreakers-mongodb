import { transporter } from "../../utils/nodeMailer";


const generateEmailContent = (data) => {
  return {
    html: `
      <!DOCTYPE html>
      <html> 
        <head> 
          <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> 
        </head> 
        <body style="margin: 0 !important; padding: 0 !important; background: #fff"> 
          <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " >
            </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                <tr> 
                  <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > 
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > 
                      <tr> 
                        <td> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
                            <tr> 
                              <td> 
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" > 
                                  <tr> 
                                    <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > 
                                      <img
                                        src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/305f7d18-be6a-43c9-b01b-8f4e6f8d4508/LBM+Logo+Auth.png?format=500w"
                                        alt="LBM logo"
                                      />
                                      <h2>
                                        ${data.header}
                                      </h2>
                                      <img
                                        src=${data.picture}
                                        alt="picture of email sender"
                                      />
                                      <div>
                                        ${data.message}
                                      </div>
                                      <div>
                                        ${data.link}
                                    </div>
                                    </td>
                                  </tr>
                                </table> 
                              </td>
                            </tr>
                          </table> 
                        </td>
                      </tr>
                    </table> 
                  </td>
                </tr>
              </table> 
        </body>
      </html>
    `,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...generateEmailContent(data),
        from: "louis.sw.ryan@gmail.com",
        to: data.email,
        subject: data.subject,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;