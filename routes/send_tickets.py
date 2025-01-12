import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import qrcode
from io import BytesIO

# Email credentials
sender_email = "fakeuser123ab@gmail.com"
password = "grqq imcd mawa hdrj"

# Parse arguments
receiver_email = sys.argv[1]
code = sys.argv[2]

# Email content
subject = "Desarrollo de aplicaciones web"
body = "Estos son tus boletos! :) El código QR está adjunto."

# Generate QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(code)
qr.make(fit=True)

# Save QR code to a BytesIO stream
qr_image = BytesIO()
qr_img = qr.make_image(fill="black", back_color="white")
qr_img.save(qr_image, format="PNG")
qr_image.seek(0)  # Reset the stream position

# Create the email
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject
message.attach(MIMEText(body, "plain"))

# Attach the QR code image
qr_part = MIMEBase("application", "octet-stream")
qr_part.set_payload(qr_image.read())
encoders.encode_base64(qr_part)
qr_part.add_header(
    "Content-Disposition", f"attachment; filename=qr_code.png"
)
message.attach(qr_part)

try:
    # Set up the server and send the email
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()  # Upgrade the connection to secure
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())
    data_to_pass_back = "success"
except Exception as e:
    data_to_pass_back = f"fail: {e}"

# Output the result back to the calling process
print(data_to_pass_back)
sys.stdout.flush()
