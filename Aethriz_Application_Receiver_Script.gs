/**
 * ============================================================================
 * AETHRIZ AI HEALTHCARE AND RESEARCH PRIVATE LIMITED
 * Winter Internship Programme 2026–2027
 * 
 * SCRIPT: Application Receiver & Automatic "Thank You for Applying" Email Dispatcher
 * 
 * ATTACH THIS TO YOUR GOOGLE SHEET:
 * "AETHRIZ AI • WINTER INTERNSHIP PROGRAM 2.0"
 * (https://docs.google.com/spreadsheets/d/1WZQ-qNqjcbyzQnNlASMHgSfGWX78kPrn5irE6Yrz8zk/edit)
 * 
 * FEATURES:
 * 1. Appends all incoming applications to Columns A to R with zero duplication
 * 2. Auto-generates sequential Reference IDs (e.g., AETH-WI26-101, AETH-WI26-102...)
 * 3. Instantly sends the official AETHRIZ "Thank you for applying" confirmation email
 *    with candidate name, applied track, application ID, and next steps!
 * ============================================================================
 */

var CONFIG = {
  COMPANY_NAME: "AETHRIZ AI Healthcare and Research Private Limited",
  SENDER_NAME: "AETHRIZ Careers",
  CONTACT_EMAIL: "aethriz.ai@gmail.com",
  WEBSITE_URL: "https://www.aethriz.com",
  X_URL: "https://x.com/aethriz",
  INSTAGRAM_URL: "https://www.instagram.com/aethriz.ai",
  LINKEDIN_URL: "https://www.linkedin.com/company/aethriz/"
};

// ============================================================================
// 1. WEBHOOK ENDPOINT (RECEIVES SUBMISSIONS FROM THE WEBSITE)
// ============================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Auto-detect last sequence number from Column B and increment (e.g. 019 -> 020)
    var lastRow = sheet.getLastRow();
    var nextNum = 1;
    if (lastRow >= 2) {
      var prevId = String(sheet.getRange(lastRow, 2).getValue() || "");
      var match = prevId.match(/\d+$/);
      if (match) {
        nextNum = parseInt(match[0], 10) + 1;
      } else {
        nextNum = lastRow;
      }
    }
    var paddedNum = Utilities.formatString("%03d", nextNum);
    var refId = "AETH-WI26-" + paddedNum;

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    var primaryWorkLink = data.portfolioUrl || data.githubUrl || data.instagramUrl || "";
    var otherLink = data.otherSocialUrl || data.youtubeUrl || "";

    // Exact Columns A to R
    var newRow = [
      formattedDate,                            // A: Timestamp
      refId,                                    // B: Reference ID
      data.position || "General Track",         // C: Position Applied
      data.fullName || "",                      // D: Full Name
      data.emailAddress || "",                  // E: Email
      data.phone || "",                         // F: Phone
      data.cityState || "",                     // G: City / State
      data.collegeCourse || "",                 // H: College & Course
      data.journeyStage || "",                  // I: Journey Stage
      data.targetFormats || "",                 // J: Target Competencies & Deliverables
      data.keySkills || "",                     // K: Secondary Skills & Tools
      data.resumeUrl || "",                     // L: Resume / CV Link
      primaryWorkLink,                          // M: Primary Work / Portfolio / GitHub Link
      otherLink,                                // N: Other Relevant Link
      data.featuredProject || "",               // O: Key Project / Achievement
      data.whyJoin || "",                       // P: Why AETHRIZ AI
      data.available3Months || "Yes",           // Q: 3-Month Remote Commitment
      "Under Review"                            // R: Application Status
    ];

    sheet.appendRow(newRow);

    // AUTOMATICALLY SEND THE OFFICIAL CONFIRMATION EMAIL
    if (data.emailAddress && data.emailAddress.indexOf("@") !== -1) {
      try {
        sendApplicationReceivedEmail({
          candidateName: data.fullName || "Applicant",
          emailAddress: data.emailAddress.trim(),
          appliedRole: data.position || "Winter Internship",
          applicationId: refId
        });
      } catch (mailErr) {
        Logger.log("Email dispatch notice: " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      applicationId: refId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// 2. AUTOMATIC "THANK YOU FOR APPLYING" EMAIL DISPATCHER
// ============================================================================

function sendApplicationReceivedEmail(details) {
  var recipientEmail = details.emailAddress;
  var candidateName = details.candidateName;
  var appliedRole = details.appliedRole;
  var applicationId = details.applicationId;

  var subject = "Application Received - " + appliedRole + " [" + applicationId + "] - AETHRIZ AI";

  var plainText = 
    "Hello " + candidateName + ",\n\n" +
    "Thank you for applying to the AETHRIZ Winter Internship Programme. Your application has been successfully received.\n\n" +
    "APPLICATION DETAILS:\n" +
    "• Candidate: " + candidateName + "\n" +
    "• Applied Role: " + appliedRole + "\n" +
    "• Application ID: " + applicationId + "\n" +
    "• Programme: Winter Internship — 2026–2027\n\n" +
    "What happens next?\n" +
    "Our team will carefully review all applications received and evaluate them based on the requirements of each role.\n" +
    "There is nothing you need to do at this stage. Please keep an eye on your inbox for future communication from the AETHRIZ team.\n\n" +
    "Please retain your Application ID for future communication.\n\n" +
    "Best regards,\n" +
    "AETHRIZ Careers\n" +
    "Winter Internship Programme\n" +
    CONFIG.WEBSITE_URL;

  var htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AETHRIZ Application Received</title>
</head>
<body style="margin:0; padding:0; background:#f3f3f3; font-family:Arial,Helvetica,sans-serif; color:#111111;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#f3f3f3; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:30px 12px;">
        
        <!-- CARD -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:650px; background:#ffffff; border:1px solid #e5e5e5;">
          
          <!-- LOGO HEADER -->
          <tr>
            <td align="center" style="padding:28px 25px; background:#fcfcfc; text-align:center;">
              <div style="font-size:28px; font-weight:900; letter-spacing:6px; color:#111111; font-family:Arial,Helvetica,sans-serif;">AETHRIZ</div>
              <div style="font-size:10px; font-weight:700; letter-spacing:3px; color:#e30613; margin-top:5px;">SYSTEM ARCHITECTURE</div>
            </td>
          </tr>

          <!-- RED BRAND LINE -->
          <tr>
            <td style="height:4px; background:#e30613; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="padding:42px 42px 38px 42px; background:#ffffff;">
              
              <div style="font-size:11px; line-height:16px; font-weight:bold; letter-spacing:2px; color:#e30613; margin:0 0 13px 0;">
                APPLICATION RECEIVED
              </div>

              <h1 style="margin:0 0 20px 0; padding:0; font-size:30px; line-height:38px; font-weight:700; color:#111111;">
                Thank you for applying.
              </h1>

              <p style="margin:0 0 18px 0; padding:0; font-size:16px; line-height:26px; color:#333333;">
                Hello <strong>` + candidateName + `</strong>,
              </p>

              <p style="margin:0 0 20px 0; padding:0; font-size:15px; line-height:25px; color:#444444;">
                Thank you for applying to the <strong>AETHRIZ Winter Internship Programme</strong>. Your application has been successfully received.
              </p>

              <p style="margin:0 0 28px 0; padding:0; font-size:15px; line-height:25px; color:#444444;">
                Our team will carefully review all applications received and evaluate them based on the requirements of each role.
              </p>

              <!-- APPLICATION DETAILS TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#f8f8f8; border:1px solid #e3e3e3;">
                <tr>
                  <td style="padding:22px 24px;">
                    <div style="font-size:11px; line-height:16px; font-weight:bold; letter-spacing:1.5px; color:#777777; margin:0 0 16px 0;">
                      APPLICATION DETAILS
                    </div>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      <tr>
                        <td width="38%" style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Candidate</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">` + candidateName + `</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Applied Role</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">` + appliedRole + `</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Application ID</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#e30613; vertical-align:top;">` + applicationId + `</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Programme</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">Winter Internship — 2026–2027</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- WHAT HAPPENS NEXT -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; margin-top:28px;">
                <tr>
                  <td>
                    <div style="font-size:17px; line-height:24px; font-weight:bold; color:#111111; margin:0 0 10px 0;">What happens next?</div>
                    <p style="margin:0; padding:0; font-size:14px; line-height:24px; color:#555555;">
                      There is nothing you need to do at this stage. Please keep an eye on your inbox for future communication from the AETHRIZ team.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- IMPORTANT NOTE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; margin-top:28px;">
                <tr>
                  <td style="border-left:3px solid #e30613; padding:3px 0 3px 16px;">
                    <p style="margin:0; padding:0; font-size:13px; line-height:22px; color:#555555;">
                      Please retain your application ID for future communication regarding your application.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#fcfcfc; padding:30px 35px; border-top:1px solid #eeeeee;">
              <div style="font-size:18px; line-height:24px; font-weight:700; letter-spacing:3px; color:#111111; margin:0 0 5px 0;">AETHRIZ</div>
              <div style="font-size:11px; line-height:16px; letter-spacing:2px; color:#777777; margin:0 0 18px 0;">BUILD WHAT'S NEXT</div>

              <div style="height:1px; background:#e5e5e5; margin:0 0 18px 0;"></div>

              <a href="` + CONFIG.WEBSITE_URL + `" target="_blank" style="font-size:13px; line-height:20px; font-weight:600; color:#111111; text-decoration:none;">
                www.aethriz.com
              </a>

              <!-- SOCIAL MEDIA -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="` + CONFIG.X_URL + `" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold; border-radius:4px;">X</a>
                  </td>
                  <td style="padding-right:10px;">
                    <a href="` + CONFIG.INSTAGRAM_URL + `" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:12px; font-weight:bold; border-radius:4px;">IG</a>
                  </td>
                  <td>
                    <a href="` + CONFIG.LINKEDIN_URL + `" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:13px; font-weight:bold; border-radius:4px;">in</a>
                  </td>
                </tr>
              </table>

              <!-- CONTACT -->
              <div style="margin-top:18px; font-size:12px; line-height:20px; color:#777777;">
                <a href="mailto:` + CONFIG.CONTACT_EMAIL + `" style="color:#777777; text-decoration:none;">` + CONFIG.CONTACT_EMAIL + `</a>
                <br>
                AETHRIZ Careers · Winter Internship Programme
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;

  GmailApp.sendEmail(recipientEmail, subject, plainText, {
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.CONTACT_EMAIL
  });
}

// ============================================================================
// 3. OPTIONAL TEST RUNNER
// ============================================================================
function testSendConfirmationEmail() {
  sendApplicationReceivedEmail({
    candidateName: "Varun Goud",
    emailAddress: "edigavarunkumar66@gmail.com",
    appliedRole: "App Development",
    applicationId: "AETH-WI26-100"
  });
  Logger.log("Test confirmation email sent successfully!");
}
