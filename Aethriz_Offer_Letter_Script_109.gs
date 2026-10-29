/**
 * ============================================================================
 * AETHRIZ AI HEALTHCARE AND RESEARCH PRIVATE LIMITED
 * Winter Internship Programme 2026–2027
 * 
 * SCRIPT: Official Selection Email & Offer Letter Dispatcher for ID 109
 * CANDIDATE: Aswin Kumar Reddy Koothedhula (AETH-WI26-109)
 * ROLE: App Development Intern (Replacing terminated candidate Ajinkya)
 * 
 * FIXES APPLIED:
 * 1. Correct WhatsApp Group: App Development (https://chat.whatsapp.com/ETGcFsyutaFFx1PeHVD8Pq)
 * 2. Guaranteed Offer Letter PDF Attachment: Advanced multi-stage Drive locator + direct UI prompt fallback
 * 3. Zero '???' Symbols: All unicode emojis replaced with universal HTML entities and clean text
 * 4. 100% Exact match to the official AETHRIZ System Architecture email design
 * ============================================================================
 */

var CONFIG = {
  // Target Candidate ID
  TARGET_REF_ID: "AETH-WI26-109",
  
  // Test Email Recipient
  TEST_EMAIL: "edigavarunkumar66@gmail.com",
  
  // OFFICIAL APP DEVELOPMENT WHATSAPP GROUP LINK (NOT Social Media!)
  WHATSAPP_GROUP_LINK: "https://chat.whatsapp.com/ETGcFsyutaFFx1PeHVD8Pq",

  // Company Details
  COMPANY_NAME: "AETHRIZ AI Healthcare and Research Private Limited",
  SENDER_NAME: "AETHRIZ Careers",
  CONTACT_EMAIL: "aethriz.ai@gmail.com",
  WEBSITE_URL: "https://www.aethriz.com",
  
  // Social Links for Footer
  X_URL: "https://x.com/aethriz",
  INSTAGRAM_URL: "https://www.instagram.com/aethriz.ai",
  LINKEDIN_URL: "https://www.linkedin.com/company/aethriz/",

  // Direct Drive File ID or URL (optional; if left blank, script searches Drive automatically)
  OFFER_LETTER_DRIVE_FILE_ID: ""
};

// ============================================================================
// CUSTOM SPREADSHEET MENU
// ============================================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("AETHRIZ Offer Dispatcher")
    .addItem("1. Send Test Email to Varun (edigavarunkumar66@gmail.com)", "sendTestOfferLetter")
    .addItem("2. Send Official Selection & Offer to ID 109 (Aswin)", "sendOfficialOfferLetterTo109")
    .addSeparator()
    .addItem("3. Link / Select Offer Letter from Google Drive", "promptLinkOfferLetter")
    .addItem("4. Inspect Candidate 109 & Drive File (Preview Only)", "inspectCandidateAndDriveFile")
    .addToUi();
}

// ============================================================================
// RUNNER FUNCTIONS
// ============================================================================

/**
 * 1. TEST DISPATCH: Sends to edigavarunkumar66@gmail.com with attached offer letter
 */
function sendTestOfferLetter() {
  var ui = SpreadsheetApp.getUi();
  
  var candidate = getCandidateData(CONFIG.TARGET_REF_ID);
  var offerFile = findOrPromptOfferLetter();

  if (!offerFile) {
    ui.alert(
      "Attachment Missing",
      "Cannot send email without the Offer Letter PDF.\nPlease ensure the offer letter for 109 is uploaded to Google Drive or paste its link using Menu Option 3.",
      ui.ButtonSet.OK
    );
    return;
  }

  var confirm = ui.alert(
    "Send Test Offer Letter Email",
    "Sending TEST selection email with attached PDF:\n\n" +
    "• Recipient: " + CONFIG.TEST_EMAIL + "\n" +
    "• Candidate: " + candidate.fullName + " (" + candidate.refId + ")\n" +
    "• App Development WhatsApp Group: " + CONFIG.WHATSAPP_GROUP_LINK + "\n" +
    "• Attached File: " + offerFile.getName() + " (" + Math.round(offerFile.getSize() / 1024) + " KB)\n\n" +
    "Do you want to proceed?",
    ui.ButtonSet.YES_NO
  );

  if (confirm !== ui.Button.YES) return;

  try {
    dispatchEmail({
      recipientEmail: CONFIG.TEST_EMAIL,
      candidate: candidate,
      offerFile: offerFile,
      isTest: true
    });

    ui.alert(
      "Test Email Sent Successfully!",
      "A test copy has been dispatched to: " + CONFIG.TEST_EMAIL + "\n\n" +
      "Attached PDF: " + offerFile.getName() + "\n" +
      "Role: " + candidate.position + "\n" +
      "WhatsApp Link: App Development Group",
      ui.ButtonSet.OK
    );
  } catch (err) {
    Logger.log("Error in sendTestOfferLetter: " + err.toString());
    ui.alert("Error sending test email:\n\n" + err.message);
  }
}

/**
 * 2. OFFICIAL DISPATCH: Sends to candidate 109 (Aswin Kumar Reddy Koothedhula)
 */
function sendOfficialOfferLetterTo109() {
  var ui = SpreadsheetApp.getUi();
  var candidate = getCandidateData(CONFIG.TARGET_REF_ID);
  var offerFile = findOrPromptOfferLetter();

  if (!offerFile) {
    ui.alert(
      "Attachment Missing",
      "Cannot dispatch official offer without the Offer Letter PDF.\nPlease upload candidate 109's offer letter or paste its Drive link.",
      ui.ButtonSet.OK
    );
    return;
  }

  var confirm = ui.alert(
    "CONFIRM OFFICIAL DISPATCH",
    "You are about to send the OFFICIAL SELECTION EMAIL and OFFER LETTER to:\n\n" +
    "• Candidate: " + candidate.fullName + "\n" +
    "• Email: " + candidate.email + "\n" +
    "• Role: " + candidate.position + "\n" +
    "• Reference ID: " + candidate.refId + "\n" +
    "• Attached PDF: " + offerFile.getName() + "\n" +
    "• WhatsApp Group: App Development Track\n\n" +
    "Are you sure you want to send this now?",
    ui.ButtonSet.YES_NO
  );

  if (confirm !== ui.Button.YES) return;

  try {
    dispatchEmail({
      recipientEmail: candidate.email,
      candidate: candidate,
      offerFile: offerFile,
      isTest: false
    });

    markOfferSentInSheet(candidate.rowIndex);

    ui.alert(
      "Official Offer Letter Dispatched!",
      "The official selection email with the attached offer letter and App Development WhatsApp group link has been sent to:\n\n" +
      candidate.fullName + " <" + candidate.email + ">\n\n" +
      "Google Sheet row marked as OFFER SENT.",
      ui.ButtonSet.OK
    );
  } catch (err) {
    Logger.log("Error in sendOfficialOfferLetterTo109: " + err.toString());
    ui.alert("Error sending official email:\n\n" + err.message);
  }
}

/**
 * 3. PROMPT TO PASTE GOOGLE DRIVE LINK / FILE ID
 */
function promptLinkOfferLetter() {
  var ui = SpreadsheetApp.getUi();
  var currentFile = findOfferLetterInDrive();
  var currentInfo = currentFile ? ("\nCurrently Linked: " + currentFile.getName() + " (" + currentFile.getId() + ")") : "\nCurrently Linked: None";

  var prompt = ui.prompt(
    "Link Offer Letter for Candidate 109",
    "Please paste the Google Drive link or File ID of candidate 109's Offer Letter:" + currentInfo +
    "\n\n(Tip: In Google Drive, right-click your offer letter > 'Copy link', then paste it here)",
    ui.ButtonSet.OK_CANCEL
  );

  if (prompt.getSelectedButton() === ui.Button.OK) {
    var input = prompt.getResponseText().trim();
    if (!input) {
      ui.alert("No link provided.");
      return;
    }
    var match = input.match(/[-\w]{25,}/);
    var fileId = match ? match[0] : input;

    try {
      var file = DriveApp.getFileById(fileId);
      PropertiesService.getDocumentProperties().setProperty("OFFER_LETTER_FILE_ID_109", fileId);
      ui.alert(
        "Offer Letter Linked Successfully!",
        "File Name: " + file.getName() + "\n" +
        "Size: " + Math.round(file.getSize() / 1024) + " KB\n" +
        "Type: " + file.getMimeType() + "\n\n" +
        "The script will now attach this exact PDF whenever you run Option 1 or Option 2!",
        ui.ButtonSet.OK
      );
    } catch (e) {
      ui.alert("Invalid File Link", "Could not access file with ID: " + fileId + "\n\nError: " + e.message, ui.ButtonSet.OK);
    }
  }
}

/**
 * 4. PREVIEW & INSPECTOR TOOL
 */
function inspectCandidateAndDriveFile() {
  var ui = SpreadsheetApp.getUi();
  try {
    var candidate = getCandidateData(CONFIG.TARGET_REF_ID);
    var offerFile = findOfferLetterInDrive();

    var msg = "CANDIDATE 109 DETAILS:\n" +
      "• Reference ID: " + candidate.refId + "\n" +
      "• Full Name: " + candidate.fullName + "\n" +
      "• Email: " + candidate.email + "\n" +
      "• Phone: " + candidate.phone + "\n" +
      "• Position: " + candidate.position + "\n" +
      "• College: " + candidate.college + "\n" +
      "• Location: " + candidate.location + "\n\n" +
      "WHATSAPP GROUP:\n" +
      "• Track: App Development\n" +
      "• Link: " + CONFIG.WHATSAPP_GROUP_LINK + "\n\n";

    if (offerFile) {
      msg += "OFFER LETTER LOCATED IN DRIVE:\n" +
        "• File Name: " + offerFile.getName() + "\n" +
        "• File Size: " + Math.round(offerFile.getSize() / 1024) + " KB\n" +
        "• File ID: " + offerFile.getId() + "\n" +
        "Status: Ready to attach!";
    } else {
      msg += "OFFER LETTER NOT FOUND IN DRIVE!\n" +
        "Use Option 3 in the menu to paste the Google Drive link.";
    }

    ui.alert("AETHRIZ Inspector", msg, ui.ButtonSet.OK);
  } catch (err) {
    ui.alert("Error inspecting:\n\n" + err.message);
  }
}

// ============================================================================
// DATA RETRIEVAL & SMART DRIVE LOCATOR
// ============================================================================

function getCandidateData(targetRefId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  var colRefId = headers.indexOf("Reference ID");
  var colName = headers.indexOf("Full Name");
  var colEmail = headers.indexOf("Email");
  var colPhone = headers.indexOf("Phone");
  var colCollege = headers.indexOf("College & Course");
  var colPosition = headers.indexOf("Position Applied");
  var colCity = headers.indexOf("City / State");

  if (colRefId === -1) colRefId = 1;
  if (colName === -1) colName = 2;
  if (colEmail === -1) colEmail = 3;
  if (colPhone === -1) colPhone = 4;
  if (colCollege === -1) colCollege = 5;
  if (colCity === -1) colCity = 7;
  if (colPosition === -1) colPosition = 8;

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var refVal = String(row[colRefId] || "").trim();
    if (refVal.toUpperCase() === targetRefId.toUpperCase() || refVal.indexOf("109") !== -1) {
      return {
        rowIndex: i + 1,
        refId: refVal || "AETH-WI26-109",
        fullName: String(row[colName] || "Aswin Kumar Reddy Koothedhula").trim(),
        email: String(row[colEmail] || "koothedhulaa@gmail.com").trim(),
        phone: String(row[colPhone] || "+91 88857 77104").trim(),
        college: String(row[colCollege] || "St. Peter's Engineering College").trim(),
        position: String(row[colPosition] || "App Development").trim(),
        location: String(row[colCity] || "Hyderabad, Telangana").trim()
      };
    }
  }

  // Exact fallback
  return {
    rowIndex: data.length,
    refId: "AETH-WI26-109",
    fullName: "Aswin Kumar Reddy Koothedhula",
    email: "koothedhulaa@gmail.com",
    phone: "+91 88857 77104",
    college: "St. Peter's Engineering College",
    position: "App Development",
    location: "Hyderabad, Telangana"
  };
}

/**
 * Searches Drive for candidate 109's offer letter.
 * If not found automatically, prompts the user to paste the link!
 */
function findOrPromptOfferLetter() {
  var file = findOfferLetterInDrive();
  if (file) return file;

  // If not found automatically, open UI prompt
  var ui = SpreadsheetApp.getUi();
  var prompt = ui.prompt(
    "Offer Letter PDF Required for Candidate 109",
    "We could not automatically locate candidate 109's Offer Letter in Drive.\n\n" +
    "Please paste the Google Drive link or File ID of candidate 109's Offer Letter:\n" +
    "(In Google Drive, right-click the file > 'Copy link' > paste here):",
    ui.ButtonSet.OK_CANCEL
  );

  if (prompt.getSelectedButton() === ui.Button.OK) {
    var input = prompt.getResponseText().trim();
    if (input) {
      var match = input.match(/[-\w]{25,}/);
      var fileId = match ? match[0] : input;
      try {
        var linkedFile = DriveApp.getFileById(fileId);
        PropertiesService.getDocumentProperties().setProperty("OFFER_LETTER_FILE_ID_109", fileId);
        return linkedFile;
      } catch (e) {
        ui.alert("Invalid Drive Link", "Could not open file: " + e.message, ui.ButtonSet.OK);
      }
    }
  }

  return null;
}

/**
 * Smart Drive search:
 * 1. Checks DocumentProperties
 * 2. Checks CONFIG.OFFER_LETTER_DRIVE_FILE_ID
 * 3. Scans top 40 most recently modified PDF/Doc files in Drive
 * 4. Runs Drive search queries for "109", "Aswin", "Koothedhula"
 */
function findOfferLetterInDrive() {
  // 1. Check DocumentProperties
  var savedId = PropertiesService.getDocumentProperties().getProperty("OFFER_LETTER_FILE_ID_109");
  if (savedId) {
    try {
      return DriveApp.getFileById(savedId);
    } catch (e) {
      Logger.log("Saved File ID not valid: " + e.toString());
    }
  }

  // 2. Direct File ID / URL from CONFIG
  if (CONFIG.OFFER_LETTER_DRIVE_FILE_ID && CONFIG.OFFER_LETTER_DRIVE_FILE_ID.trim() !== "") {
    var rawId = CONFIG.OFFER_LETTER_DRIVE_FILE_ID.trim();
    var match = rawId.match(/[-\w]{25,}/);
    var fileId = match ? match[0] : rawId;
    try {
      return DriveApp.getFileById(fileId);
    } catch (e) {
      Logger.log("Direct File ID lookup failed: " + e.toString());
    }
  }

  // 3. Scan top 40 recently modified files in the user's Google Drive
  try {
    var recentFiles = DriveApp.getFiles();
    var count = 0;
    while (recentFiles.hasNext() && count < 40) {
      var rf = recentFiles.next();
      count++;
      var rName = rf.getName().toLowerCase();
      // Look for files with 109, aswin, or koothedhula
      if (rName.indexOf("109") !== -1 || rName.indexOf("aswin") !== -1 || rName.indexOf("koothedhula") !== -1) {
        if (!rf.isTrashed()) {
          Logger.log("Found recent offer file: " + rf.getName());
          return rf;
        }
      }
    }
  } catch (e) {
    Logger.log("Recent files scan exception: " + e.toString());
  }

  // 4. DriveApp.searchFiles queries
  var searchTerms = ["109", "Aswin", "Koothedhula", "AETH-WI26-109"];
  for (var k = 0; k < searchTerms.length; k++) {
    var term = searchTerms[k];
    try {
      var files = DriveApp.searchFiles("title contains '" + term + "' and trashed = false");
      if (files.hasNext()) {
        return files.next();
      }
    } catch (e) {
      Logger.log("Drive search error: " + e.toString());
    }
  }

  return null;
}

function markOfferSentInSheet(rowIndex) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var statusCol = headers.indexOf("Offer Letter Status") + 1;
  
  if (statusCol === 0) {
    statusCol = lastCol + 1;
    sheet.getRange(1, statusCol).setValue("Offer Letter Status");
  }

  var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
  sheet.getRange(rowIndex, statusCol).setValue("OFFER SENT (" + timestamp + ")");
}

// ============================================================================
// EMAIL DISPATCHER (NO EMOJIS, ZERO '???' SYMBOLS)
// ============================================================================

function dispatchEmail(params) {
  var recipientEmail = params.recipientEmail;
  var candidate = params.candidate;
  var offerFile = params.offerFile;
  var isTest = params.isTest;

  var subject = (isTest ? "[TEST PREVIEW] " : "") +
    "Official Selection & Internship Offer Letter - AETHRIZ AI [" + candidate.refId + "]";

  var offerFileName = offerFile ? offerFile.getName() : "AETHRIZ_Offer_Letter_109.pdf";

  var htmlBody = buildCleanHtml({
    candidateName: candidate.fullName,
    appliedRole: candidate.position,
    applicationId: candidate.refId,
    whatsappUrl: CONFIG.WHATSAPP_GROUP_LINK,
    websiteUrl: CONFIG.WEBSITE_URL,
    contactEmail: CONFIG.CONTACT_EMAIL,
    xUrl: CONFIG.X_URL,
    instagramUrl: CONFIG.INSTAGRAM_URL,
    linkedinUrl: CONFIG.LINKEDIN_URL,
    offerFileName: offerFileName,
    isTest: isTest
  });

  var plainText = buildCleanPlainText({
    candidateName: candidate.fullName,
    appliedRole: candidate.position,
    applicationId: candidate.refId,
    whatsappUrl: CONFIG.WHATSAPP_GROUP_LINK,
    contactEmail: CONFIG.CONTACT_EMAIL,
    isTest: isTest
  });

  var attachments = [];
  if (offerFile) {
    try {
      var blob = (offerFile.getMimeType() === MimeType.GOOGLE_DOCS) ? offerFile.getAs(MimeType.PDF) : offerFile.getBlob();
      blob.setName(offerFileName);
      attachments.push(blob);
    } catch (e) {
      attachments.push(offerFile.getBlob());
    }
  }

  var emailOptions = {
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.CONTACT_EMAIL,
    attachments: attachments
  };

  if (!isTest) {
    emailOptions.cc = CONFIG.CONTACT_EMAIL;
  }

  GmailApp.sendEmail(recipientEmail, subject, plainText, emailOptions);
}

// ============================================================================
// PURE HTML BUILDER (MATCHING USER'S IMAGE WITH ZERO EMOJI CORRUPTION)
// ============================================================================

function buildCleanHtml(d) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AETHRIZ Selection & Offer Letter</title>
</head>
<body style="margin:0; padding:0; background:#f3f3f3; font-family:Arial,Helvetica,sans-serif; color:#111111;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#f3f3f3; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:30px 12px;">
        
        <!-- MAIN CARD CONTAINER -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:650px; background:#ffffff; border:1px solid #e5e5e5;">
          
          ${d.isTest ? `
          <!-- TEST BANNER -->
          <tr>
            <td style="background:#fff3cd; color:#856404; padding:12px 20px; font-size:12px; font-weight:bold; text-align:center; border-bottom:1px solid #ffeeba; letter-spacing:0.5px;">
              [TEST PREVIEW EMAIL] - Targeted for: ${d.candidateName} (${d.applicationId})
            </td>
          </tr>` : ''}

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

          <!-- MAIN CONTENT BODY -->
          <tr>
            <td style="padding:42px 42px 38px 42px; background:#ffffff;">
              
              <!-- RED MONOSPACE KICKER -->
              <div style="font-size:11px; line-height:16px; font-weight:bold; letter-spacing:2px; color:#e30613; margin:0 0 13px 0;">
                OFFICIAL SELECTION &amp; APPOINTMENT
              </div>

              <!-- MAIN TITLE -->
              <h1 style="margin:0 0 20px 0; padding:0; font-size:30px; line-height:38px; font-weight:700; color:#111111;">
                Congratulations on your selection.
              </h1>

              <!-- GREETING -->
              <p style="margin:0 0 18px 0; padding:0; font-size:16px; line-height:26px; color:#333333;">
                Hello <strong>${d.candidateName}</strong>,
              </p>

              <!-- LEAD PARAGRAPHS -->
              <p style="margin:0 0 18px 0; padding:0; font-size:15px; line-height:25px; color:#444444;">
                We are pleased to inform you that you have been selected for the <strong>AETHRIZ Winter Internship Programme 2026&ndash;2027</strong> in the <strong>${d.appliedRole}</strong> track.
              </p>

              <p style="margin:0 0 26px 0; padding:0; font-size:15px; line-height:25px; color:#444444;">
                Please find your official <strong>Offer Letter attached to this email as a PDF document</strong>. Review the immersion responsibilities, deliverables, and terms carefully.
              </p>

              <!-- APPLICATION DETAILS TABLE (EXACT MATCH TO IMAGE) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#f8f8f8; border:1px solid #e3e3e3; margin-bottom:28px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <div style="font-size:11px; line-height:16px; font-weight:bold; letter-spacing:1.5px; color:#777777; margin:0 0 16px 0;">
                      APPLICATION DETAILS
                    </div>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      <tr>
                        <td width="38%" style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Candidate</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">${d.candidateName}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Applied Role</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">${d.appliedRole}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Application ID</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#e30613; vertical-align:top;">${d.applicationId}</td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0; font-size:13px; line-height:20px; color:#777777; vertical-align:top;">Programme</td>
                        <td style="padding:7px 0; font-size:14px; line-height:20px; font-weight:bold; color:#111111; vertical-align:top;">Winter Internship &mdash; 2026</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- WHAT HAPPENS NEXT SECTION -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; margin-top:10px;">
                <tr>
                  <td>
                    <div style="font-size:17px; line-height:24px; font-weight:bold; color:#111111; margin:0 0 12px 0;">
                      What happens next?
                    </div>
                    
                    <p style="margin:0 0 14px 0; padding:0; font-size:14px; line-height:24px; color:#555555;">
                      1. <strong>Offer Letter Attached:</strong> Your signed Offer Letter is attached to this email as a PDF. Please download and review the guidelines.<br>
                      2. <strong>Confirm Acceptance:</strong> Reply to this email (<strong>${d.contactEmail}</strong>) within 48 hours to confirm your acceptance.<br>
                      3. <strong>Join WhatsApp Group:</strong> To stay informed about onboarding schedules, sprint announcements, and cohort updates, kindly join the official App Development WhatsApp group below:
                    </p>

                    <!-- CLEAN WHATSAPP BUTTON (NO CORRUPTED EMOJIS) -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:16px 0 10px 0;">
                      <tr>
                        <td align="center" style="background:#25D366; border-radius:6px; padding:12px 24px;">
                          <a href="${d.whatsappUrl}" target="_blank" style="font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; display:inline-block; font-family:Arial,Helvetica,sans-serif;">
                            Join App Development WhatsApp Group &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <div style="font-size:12px; color:#777777; margin-top:6px; word-break:break-all;">
                      Or link: <a href="${d.whatsappUrl}" target="_blank" style="color:#128C7E; text-decoration:underline;">${d.whatsappUrl}</a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- IMPORTANT NOTE (EXACT RED VERTICAL BAR FROM IMAGE) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; margin-top:28px;">
                <tr>
                  <td style="border-left:3px solid #e30613; padding:3px 0 3px 16px;">
                    <p style="margin:0; padding:0; font-size:13px; line-height:22px; color:#555555;">
                      Please retain your application ID (<strong>${d.applicationId}</strong>) and confirm your acceptance by replying to this email.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER (EXACT MATCH TO IMAGE) -->
          <tr>
            <td style="background:#fcfcfc; padding:30px 35px; border-top:1px solid #eeeeee;">
              <div style="font-size:18px; line-height:24px; font-weight:700; letter-spacing:3px; color:#111111; margin:0 0 5px 0;">AETHRIZ</div>
              <div style="font-size:11px; line-height:16px; letter-spacing:2px; color:#777777; margin:0 0 18px 0;">BUILD WHAT'S NEXT</div>

              <div style="height:1px; background:#e5e5e5; margin:0 0 18px 0;"></div>

              <a href="${d.websiteUrl}" target="_blank" style="font-size:13px; line-height:20px; font-weight:600; color:#111111; text-decoration:none;">
                www.aethriz.com
              </a>

              <!-- SOCIAL MEDIA (X, IG, in, Mail) -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="${d.xUrl}" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold; border-radius:4px;">X</a>
                  </td>
                  <td style="padding-right:10px;">
                    <a href="${d.instagramUrl}" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:12px; font-weight:bold; border-radius:4px;">IG</a>
                  </td>
                  <td style="padding-right:10px;">
                    <a href="${d.linkedinUrl}" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:13px; font-weight:bold; border-radius:4px;">in</a>
                  </td>
                  <td>
                    <a href="mailto:${d.contactEmail}" target="_blank" style="display:block; width:36px; height:36px; line-height:36px; text-align:center; background:#111111; color:#ffffff; text-decoration:none; font-size:11px; font-weight:bold; border-radius:4px;">MAIL</a>
                  </td>
                </tr>
              </table>

              <!-- CONTACT -->
              <div style="margin-top:18px; font-size:12px; line-height:20px; color:#777777;">
                <a href="mailto:${d.contactEmail}" style="color:#777777; text-decoration:none;">${d.contactEmail}</a>
                <br>
                AETHRIZ Careers &middot; Winter Internship Programme
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
}

function buildCleanPlainText(d) {
  return (d.isTest ? "[TEST PREVIEW EMAIL]\n\n" : "") +
    "AETHRIZ - WINTER INTERNSHIP PROGRAMME 2026-27\n" +
    "==============================================\n\n" +
    "Hello " + d.candidateName + ",\n\n" +
    "Congratulations on your selection!\n\n" +
    "We are pleased to inform you that you have been selected for the AETHRIZ Winter Internship Programme 2026-2027 in the " + d.appliedRole + " track.\n\n" +
    "Please find your official Offer Letter attached to this email as a PDF document.\n\n" +
    "APPLICATION DETAILS:\n" +
    "- Candidate: " + d.candidateName + "\n" +
    "- Applied Role: " + d.appliedRole + "\n" +
    "- Application ID: " + d.applicationId + "\n" +
    "- Programme: Winter Internship - 2026\n\n" +
    "WHAT HAPPENS NEXT:\n" +
    "1. Review the attached Offer Letter PDF.\n" +
    "2. Reply to this email (" + d.contactEmail + ") within 48 hours to confirm your acceptance.\n" +
    "3. Join the official App Development WhatsApp group for cohort onboarding schedules & updates:\n" +
    d.whatsappUrl + "\n\n" +
    "Please retain your application ID (" + d.applicationId + ") for future communication.\n\n" +
    "Best regards,\n" +
    "AETHRIZ Careers Team\n" +
    d.contactEmail + "\n" +
    "https://www.aethriz.com";
}
